import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Meal } from "@/types/Meal";


type AddMealFormProps = {
  onAdd: (meal: { name: string; calories: number }) => void;
  onCancel: () => void;
};

const AddMealForm = ({ onAdd, onCancel }: AddMealFormProps) => {
  const [mealName, setMealName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mealName.trim()) return;

    setIsSubmitting(true);

    try {
      // 👇 This is where you could later call a real food API
      const calories = Math.floor(Math.random() * 500) + 100;

      onAdd({
        name: mealName.trim(),
        calories,
      });

      setMealName('');
    } catch (err) {
      console.error('❌ Failed to add meal:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter food name..."
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!mealName.trim() || isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Meal'}
        </Button>
      </div>
    </form>
  );
};

export default AddMealForm;
