
import React from 'react';
import { Card } from "@/components/ui/card";
import { Utensils } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  calories: number;
  timestamp: Date;
}

interface MealListProps {
  meals: Meal[];
}

const MealList = ({ meals }: MealListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Today's Meals</h2>
      {meals.map((meal) => (
        <Card key={meal.id} className="p-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Utensils className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <h3 className="font-medium">{meal.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(meal.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{meal.calories} kcal</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MealList;
