export function getMainFood(concepts) {
  return concepts
    .filter(c => c.value > 0.7)
    .sort((a, b) => b.value - a.value)[0];
}
