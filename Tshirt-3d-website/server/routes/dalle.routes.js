import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from DALL·E ROUTES" });
});

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      model: "dall-e-3", // Use "dall-e-3" for high-quality images
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = response.data[0].url; // Retrieve image URL

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
