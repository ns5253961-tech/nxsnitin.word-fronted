require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");
const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Supabase Admin Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const gemini = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// NVIDIA NIM Client
const nvidia = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY || "",
  baseURL: "https://integrate.api.nvidia.com/v1",
});

// OpenAI Client (for DALL-E 3 Image Generation)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

// =====================
// 🤖 AI CHAT ENDPOINT
// =====================
app.post("/ai-chat", async (req, res) => {
  const { prompt, systemPrompt } = req.body;
  const fullPrompt = systemPrompt ? `${systemPrompt}\n\nUser: ${prompt}` : prompt;

  try {
    if (process.env.GEMINI_API_KEY) {
      const result = await gemini.generateContent(fullPrompt);
      const text = result.response.text();
      return res.json({ response: text, model: "gemini" });
    }
  } catch (err) {
    console.error("Gemini Error:", err.message);
  }

  try {
    if (process.env.NVIDIA_API_KEY) {
      const completion = await nvidia.chat.completions.create({
        model: "meta/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: fullPrompt }],
      });
      return res.json({ response: completion.choices[0]?.message?.content, model: "nvidia" });
    }
  } catch (err) {
    console.error("NVIDIA Error:", err.message);
  }

  res.status(500).json({ response: "AI limit reached. Try later." });
});

// =====================
// 💳 RAZORPAY
// =====================
app.post("/create-order", async (req, res) => {
  try {
    const order = await razorpay.orders.create({ amount: 9900, currency: "INR" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Order failed" });
  }
});

app.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");

    if (expected === razorpay_signature) {
      await supabase.from("users").upsert({ id: user_id, isPaid: true });
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// =====================
// 🖼️ IMAGE GENERATION (PixArt Sigma via Together AI / Universal)
// =====================
app.post("/generate-image-pixverse", async (req, res) => {
  try {
    const { prompt } = req.body;
    const togetherKey = process.env.PIXVERSE_API_KEY;

    if (!togetherKey) return res.status(400).json({ error: "API key missing" });

    console.log("🎨 Generating Image via PixArt-Sigma Protocol...");
    
    // Using Together AI Image Generation Endpoint
    const response = await axios.post("https://api.together.xyz/v1/images/generations", {
      prompt: prompt,
      model: "togethercomputer/everything-v2-1", // High compatibility fallback model
      n: 1,
      steps: 20,
      width: 1024,
      height: 1024
    }, {
      headers: {
        "Authorization": `Bearer ${togetherKey}`,
        "Content-Type": "application/json"
      }
    });

    const imageUrl = response.data?.data?.[0]?.url || response.data?.url;

    if (imageUrl) {
      res.json({ imageUrl: imageUrl });
    } else {
      res.json({ error: "Response received but no image URL found", data: response.data });
    }

  } catch (error) {
    console.error("PixArt Error:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Image generation failed", 
      detail: error.response?.data?.error?.message || error.message 
    });
  }
});

app.get("/", (req, res) => res.json({ status: "running" }));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));
