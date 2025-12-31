const healthTips = [
  "Drink water before meals to reduce calorie intake.",
  "Include protein in every meal to stay full longer.",
  "Eat slowly to help digestion and avoid overeating.",
  "Fruits and vegetables add volume with fewer calories.",
  "Avoid sugary drinks; choose water or lemon water.",
  "Consistency matters more than perfection in diet.",
  "Stop eating when you feel 80% full."
];

// Pick tip based on day (changes daily)
export function getDailyHealthTip() {
  const dayIndex = new Date().getDate() % healthTips.length;
  return healthTips[dayIndex];
}