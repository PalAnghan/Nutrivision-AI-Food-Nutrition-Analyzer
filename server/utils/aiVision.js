import fs from "fs";

export async function detectFoodFromImage(imagePath) {
  try {
    const imageBase64 = fs.readFileSync(imagePath, {
      encoding: "base64",
    });

    const response = await fetch(
      "https://api.clarifai.com/v2/models/general-image-recognition/outputs",
      {
        method: "POST",
        headers: {
          Authorization: process.env.CLARIFAI_PAT, // MUST start with Bearer
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_app_id: {
            user_id: "clarifai",
            app_id: "main",
          },
          inputs: [
            {
              data: {
                image: {
                  base64: imageBase64,
                },
              },
            },
          ],
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Clarifai API error:", result);
      throw new Error("Clarifai failed");
    }

    return result.outputs[0].data.concepts;
  } catch (error) {
  console.error("Clarifai full error:", error);
  throw new Error("CLARIFAI_FAILED");
}
}
