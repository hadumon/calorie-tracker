import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Meal = mongoose.model('Meal', mealSchema);
