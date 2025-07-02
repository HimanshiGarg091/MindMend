const express = require('express');
const Client = require('../models/Client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

router.post('/', async (req, res) => {
  try {
    const { email, password, age, language, concerns, mode } = req.body;

    // Check if user already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the client
    const client = new Client({
      email,
      password: hashedPassword,
      age,
      language,
      concerns: Array.isArray(concerns) ? concerns : [concerns],
      mode,
    });

    await client.save();

    // Generate JWT token
    const token = jwt.sign({ id: client._id, role: 'client' }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ message: 'Client registered successfully', token, client });
  } catch (err) {
    console.error('Client Registration Error:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
