const express = require('express');
const Client = require('../models/Client');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password, age, language, concerns, mode } = req.body;
    const client = new Client({
      email,
      password,
      age,
      language,
      concerns: Array.isArray(concerns) ? concerns : [concerns],
      mode,
    });
    await client.save();
    res.status(201).json({ message: 'Client registered', client });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
