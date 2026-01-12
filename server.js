// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   model: 'gpt-4o-mini',
//   input: 'Joke related to computer science',
// });

// console.log(response.output_text);
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());//parse incoming request.

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Smart Chatbot API"
  }
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openrouter.chat.send({
      model: "google/gemma-3-4b-it:free",
      messages: [{ role: "user", content: message }]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "AI not responding" });
  }
});

app.listen(5000, () => {
  console.log("AI API running at http://localhost:5000");
});
