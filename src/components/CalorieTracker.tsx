import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import AddMealForm from './AddMealForm';
import DailySummary from './DailySummary';
import MealList from './MealList';
import { format } from "date-fns";
import { BackendMeal } from '@/types/Meal';

interface Meal {
  id: string; // from MongoDB
  name: string;
  calories: number;
  timestamp: string; // ISO date string from backend
}

const CalorieTracker = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const dailyGoal = 2000;

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const progress = (totalCalories / dailyGoal) * 100;

  // ✅ Load meals from backend
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch('/api/meals');
        const data: BackendMeal[] = await res.json();
  
        // Convert _id → id
        const mappedMeals: Meal[] = data.map(meal => ({
          id: meal._id,
          name: meal.name,
          calories: meal.calories,
          timestamp: meal.timestamp,
        }));
  
        setMeals(mappedMeals);
      } catch (err) {
        console.error("❌ Failed to fetch meals:", err);
      }
    };
  
    fetchMeals();
  }, []);
  

  // ✅ Add meal via backend
  const handleAddMeal = async (meal: { name: string; calories: number }) => {
    try {
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meal),
      });
  
      if (!res.ok) throw new Error("Failed to save meal");
  
      const saved: BackendMeal = await res.json();
  
      const savedMeal: Meal = {
        id: saved._id,
        name: saved.name,
        calories: saved.calories,
        timestamp: saved.timestamp,
      };
  
      setMeals(prev => [savedMeal, ...prev]);
      setIsAddingMeal(false);
      toast.success("Meal added successfully");
    } catch (err) {
      console.error("❌ Failed to add meal:", err);
      toast.error("Could not add meal");
    }
  };
  

  const handleUpdateMeal = (updatedMeal: Meal) => {
    setMeals(meals.map(meal =>
      meal.id === updatedMeal.id ? updatedMeal : meal
    ));
    toast.success("Meal updated successfully");
  };

  const handleDeleteMeal = (mealId: string) => {
    setMeals(meals.filter(meal => meal.id !== mealId));
    toast.success("Meal deleted successfully");
  };

  // ✅ Safely group meals by date
  const getMealsByDate = () => {
    const grouped: { [key: string]: Meal[] } = {};

    meals.forEach(meal => {
      try {
        const date = new Date(meal.timestamp);
        if (isNaN(date.getTime())) throw new Error("Invalid date");
        const key = format(date, 'yyyy-MM-dd');

        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(meal);
      } catch (err) {
        console.warn("⛔ Skipping invalid meal:", meal, err);
      }
    });

    return grouped;
  };

  const groupedMeals = getMealsByDate();
  const dates = Object.keys(groupedMeals).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 relative">
      <div className="food-float food-float-apple absolute"></div>
      <div className="food-float food-float-broccoli absolute"></div>
      <div className="food-float food-float-carrot absolute"></div>

      <Card className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Calorie Tracker</h1>
          <Button onClick={() => setIsAddingMeal(true)} className="bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Meal
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Daily Progress</span>
              <span>{totalCalories} / {dailyGoal} kcal</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {isAddingMeal ? (
            <AddMealForm
              onAdd={handleAddMeal}
              onCancel={() => setIsAddingMeal(false)}
            />
          ) : (
            <>
              <DailySummary
                totalCalories={totalCalories}
                goalCalories={dailyGoal}
              />
              {dates.length > 0 ? (
                <div className="space-y-8">
                  {dates.map(date => (
                    <div key={date} className="space-y-4">
                      <h2 className="text-lg font-semibold text-gray-700">
                        {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                      </h2>
                      <MealList
                        meals={groupedMeals[date]}
                        onUpdate={handleUpdateMeal}
                        onDelete={handleDeleteMeal}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <UtensilsCrossed className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2">No meals added yet. Start tracking your calories!</p>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CalorieTracker;
