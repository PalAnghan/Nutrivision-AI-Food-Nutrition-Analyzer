export const getHealthStatus = ({ calories, fat, sugar }) => {
  if (fat <= 5 && sugar <= 10) return "Healthy";
  if (fat <= 12) return "Moderately Healthy";
  return "Unhealthy";
};
