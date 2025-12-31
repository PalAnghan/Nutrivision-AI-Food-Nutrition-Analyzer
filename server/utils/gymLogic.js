export const getGymAdvice = (gymMode, foodInfo) => {
  const { calories, protein, fat } = foodInfo;

  if (gymMode === "bulking") {
    if (protein >= 15 && calories >= 250)
      return "Good choice for bulking";
    return "Add more protein-rich foods";
  }

  if (gymMode === "cutting") {
    if (fat <= 8 && calories <= 250)
      return "Good for fat loss";
    return "Avoid high-fat foods";
  }

  // maintenance
  return "Eat in moderation to maintain weight";
};
