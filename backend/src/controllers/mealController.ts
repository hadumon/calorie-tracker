import { Request, Response } from 'express';
import { Meal } from '../models/meal';

// GET /api/meals
export const getMeals = async (_req: Request, res: Response) => {
  try {
    const meals = await Meal.find().sort({ timestamp: -1 });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch meals', error: err });
  }
};

// POST /api/meals
export const createMeal = async (req: Request, res: Response) => {
  try {
    const { name, calories } = req.body;

    if (!name || typeof calories !== 'number') {
      return res.status(400).json({ message: "Invalid input. 'name' and 'calories' are required." });
    }

    const newMeal = new Meal({ name, calories });
    const savedMeal = await newMeal.save();

    res.status(201).json(savedMeal);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create meal', error: err });
  }
};

// DELETE /api/meals/:id
export const deleteMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Meal.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json({ message: 'Meal deleted', meal: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete meal', error: err });
  }
};
