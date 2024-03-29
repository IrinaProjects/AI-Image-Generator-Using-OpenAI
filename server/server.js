const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(4000, () => {
  console.log("working...");
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (prompt) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });
  const image = response.data.data[0].b64_json;
  //   image_url = response.data.data[0].url;
  return image;
};

app.post("/generateImage", async (req, res) => {
  const image = await generateImage(req.body.prompt);
  //   console.log(req.body.prompt);
  console.log(image);
  res.send({ image });
  //   res.send({ data: "Testing" });
});
