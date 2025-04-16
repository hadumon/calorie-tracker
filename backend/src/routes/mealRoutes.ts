import express from 'express';
import {
  getMeals,
  createMeal,
  deleteMeal,
} from '../controllers/mealController';

const router = express.Router();

router.get('/', getMeals);
router.post('/', createMeal);
router.delete('/:id', deleteMeal);

export default router;
