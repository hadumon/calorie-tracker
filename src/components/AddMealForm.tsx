
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface AddMealFormProps {
  onAdd: (meal: any) => void;
  onCancel: () => void;
}

const AddMealForm = ({ onAdd, onCancel }: AddMealFormProps) => {
  const [mealName, setMealName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would use the API to get accurate calorie data
    // For now, we'll use a mock value
    onAdd({
      id: Date.now().toString(),
      name: mealName,
      calories: Math.floor(Math.random() * 500) + 100, // Mock calorie value
      timestamp: new Date(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for a food item..."
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!mealName.trim()}>
          Add Meal
        </Button>
      </div>
    </form>
  );
};

export default AddMealForm;
