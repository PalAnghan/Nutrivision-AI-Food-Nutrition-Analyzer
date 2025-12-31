export const getAgeRecommendation = ({ fat, sugar }) => {
  if (sugar > 10) return "13–40";
  if (fat > 12) return "18–40";
  return "All";
};
