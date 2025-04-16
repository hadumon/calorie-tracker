
import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface DailySummaryProps {
  totalCalories: number;
  goalCalories: number;
}

const DailySummary = ({ totalCalories, goalCalories }: DailySummaryProps) => {
  const remaining = goalCalories - totalCalories;
  const isOverGoal = totalCalories > goalCalories;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4 bg-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Consumed</p>
            <p className="text-2xl font-bold text-blue-600">{totalCalories}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-blue-500" />
        </div>
      </Card>

      <Card className={`p-4 ${isOverGoal ? 'bg-red-50' : 'bg-green-50'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Remaining</p>
            <p className={`text-2xl font-bold ${isOverGoal ? 'text-red-600' : 'text-green-600'}`}>
              {remaining}
            </p>
          </div>
          <TrendingDown className={`h-8 w-8 ${isOverGoal ? 'text-red-500' : 'text-green-500'}`} />
        </div>
      </Card>
    </div>
  );
};

export default DailySummary;
