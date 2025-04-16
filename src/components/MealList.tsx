
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Utensils, Edit2, Save, X } from "lucide-react";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedCalories, setEditedCalories] = useState(0);

  const handleEdit = (meal: Meal) => {
    setEditingId(meal.id);
    setEditedName(meal.name);
    setEditedCalories(meal.calories);
  };

  const handleSave = (meal: Meal) => {
    // Here you would typically update the meal in the parent component
    // For now, we'll just cancel the edit mode
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Today's Meals</h2>
      {meals.map((meal) => (
        <Card key={meal.id} className="p-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <Utensils className="h-5 w-5 text-gray-400 mr-3" />
              {editingId === meal.id ? (
                <div className="flex-1 space-y-2">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full"
                    placeholder="Meal name"
                  />
                  <Input
                    type="number"
                    value={editedCalories}
                    onChange={(e) => setEditedCalories(Number(e.target.value))}
                    className="w-full"
                    placeholder="Calories"
                  />
                </div>
              ) : (
                <div>
                  <h3 className="font-medium">{meal.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(meal.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {editingId === meal.id ? (
                <>
                  <Button size="sm" onClick={() => handleSave(meal)} variant="outline">
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={handleCancel} variant="outline">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <p className="font-semibold mr-4">{meal.calories} kcal</p>
                  <Button size="sm" onClick={() => handleEdit(meal)} variant="outline">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MealList;
