// backend/routes/mood.js
const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood"); // Your Mongoose model

// POST /api/mood
router.post("/", async (req, res) => {
  const { mood, note } = req.body;
  await Mood.create({ user: req.user.id, moodValue: Number(mood), note, date: new Date() });
  res.json({ success: true });
});

// GET /api/mood/history
router.get("/history", async (req, res) => {
  const history = await Mood.find({ user: req.user.id }).sort({ date: 1 });
  res.json(history);
});

// GET /api/mood/streak
router.get("/streak", async (req, res) => {
  const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 });
  let streak = 0;
  let prev = null;
  for (let m of moods) {
    const d = new Date(m.date);
    d.setHours(0,0,0,0);
    if (!prev) {
      prev = d;
      streak = 1;
    } else {
      prev.setDate(prev.getDate() - 1);
      if (d.getTime() === prev.getTime()) {
        streak++;
        prev = d;
      } else {
        break;
      }
    }
  }
  res.json({ streak });
});

module.exports = router;