import fs from "fs";
import fetch from "node-fetch";

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
          Authorization: `Bearer ${process.env.CLARIFAI_PAT}`,
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
      console.error("Clarifai error:", result);
      throw new Error("CLARIFAI_FAILED");
    }

    return result.outputs[0].data.concepts;
  } catch (err) {
    console.error("detectFoodFromImage error:", err.message);
    throw err;
  }
}
