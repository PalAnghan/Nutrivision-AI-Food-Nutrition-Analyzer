const { food, calories, protein, mealType } = req.body;

await FoodHistory.create({
  food,
  calories,
  protein,
  mealType
});
