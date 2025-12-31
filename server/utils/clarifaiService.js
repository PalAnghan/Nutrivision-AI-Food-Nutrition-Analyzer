import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_PAT}`);

export async function detectFoodFromImage(imageBase64) {
  return new Promise((resolve, reject) => {
    stub.PostModelOutputs(
      {
        user_app_id: {
          user_id: process.env.CLARIFAI_USER_ID,
          app_id: process.env.CLARIFAI_APP_ID,
        },
        model_id: "food-item-recognition",
        inputs: [
          {
            data: {
              image: { base64: imageBase64 },
            },
          },
        ],
      },
      metadata,
      (err, response) => {
        if (err) return reject(err);

        if (response.status.code !== 10000) {
          return reject(response.status.description);
        }

        const foods = response.outputs[0].data.concepts.map(c => ({
          name: c.name,
          confidence: c.value,
        }));

        resolve(foods);
      }
    );
  });
}
