import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

dotenv.config();

async function testAI() {
  try {
    const openrouter = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:8080",
        "X-Title": "Smart Chatbot Test"
      }
    });

    const response = await openrouter.chat.send({
      model: "google/gemma-3-4b-it:free",
      messages: [{ role: "user", content: "Say hello in one line" }]
    });

    console.log("AI RESPONSE:");
    console.log(response.choices[0].message.content);

  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

testAI();
