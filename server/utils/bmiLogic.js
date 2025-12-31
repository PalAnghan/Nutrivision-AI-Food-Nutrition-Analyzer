export const calculateBMI = (heightCm, weightKg) => {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  return {
    bmi: Number(bmi.toFixed(1)),
    category,
  };
};
