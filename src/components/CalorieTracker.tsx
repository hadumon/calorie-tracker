import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import AddMealForm from './AddMealForm';
import DailySummary from './DailySummary';
import MealList from './MealList';

interface Meal {
  id: string;
  name: string;
  calories: number;
  timestamp: Date;
}

const CalorieTracker = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const dailyGoal = 2000; // Default daily calorie goal

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const progress = (totalCalories / dailyGoal) * 100;

  const handleAddMeal = (meal: Meal) => {
    setMeals([...meals, meal]);
    setIsAddingMeal(false);
    toast.success("Meal added successfully");
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

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card className="p-6">
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
            <AddMealForm onAdd={handleAddMeal} onCancel={() => setIsAddingMeal(false)} />
          ) : (
            <>
              <DailySummary totalCalories={totalCalories} goalCalories={dailyGoal} />
              {meals.length > 0 ? (
                <MealList 
                  meals={meals} 
                  onUpdate={handleUpdateMeal}
                  onDelete={handleDeleteMeal}
                />
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
