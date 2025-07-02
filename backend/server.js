const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uri="mongodb+srv://garghimanshi093:mindMend@cluster0.mafkrsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const MONGO_URI = process.env.MONGO_URI || uri

const app = express();
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatRoutes);

=======
app.use("/api/mood", require("./routes/mood"));
>>>>>>> 1a1263600f27a4749242173f6e03e1f607747ae8

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for credentials upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['therapist', 'client'], required: true },
  // Therapist fields
  licenseNumber: String,
  expertise: [String],
  yearsExperience: Number,
  institution: String,
  credentials: String, // file path
  // Client fields
  age: Number,
  preferredLanguage: String,
  concerns: [String],
  communicationMode: String,
});
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// JWT Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Role-based Middleware
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}

// Sign Up Route
app.post('/api/signup', upload.single('credentials'), async (req, res) => {
  try {
    // Debug: log incoming fields and file
    console.log('Signup body:', req.body);
    console.log('Signup file:', req.file);

    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, password, and role are required.' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let userData = { email, password: hashedPassword, role };
    if (role === 'therapist') {
      userData.licenseNumber = req.body.licenseNumber;
      userData.expertise = req.body.expertise ? Array.isArray(req.body.expertise) ? req.body.expertise : [req.body.expertise] : [];
      userData.yearsExperience = req.body.yearsExperience;
      userData.institution = req.body.institution;
      userData.credentials = req.file ? req.file.path : '';
    } else if (role === 'client') {
      userData.age = req.body.age;
      userData.preferredLanguage = req.body.preferredLanguage;
      userData.concerns = req.body.concerns ? Array.isArray(req.body.concerns) ? req.body.concerns : [req.body.concerns] : [];
      userData.communicationMode = req.body.communicationMode;
    }
    const user = new User(userData);
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials.' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example protected route
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Profile data', user: req.user });
});

// Chatbot Route - OpenAI Integration
const axios = require('axios');

app.post('/api/chat', authenticateToken, async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Make sure to set this in your .env
        },
      }
    );

    const botReply = response.data.choices[0].message.content.trim();
    res.json({ reply: botReply });
  } catch (err) {
    console.error('Chatbot error:', err.message);
    res.status(500).json({ error: 'Failed to connect to AI.' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
