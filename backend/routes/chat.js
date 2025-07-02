// backend/routes/chat.js
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(message);
    const response = await result.response;
    const botReply = response.text();

    res.json({ reply: botReply });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Error contacting Gemini API' });
  }
});

module.exports = router;
