const express = require('express');
const multer = require('multer');
const Therapist = require('../models/Therapist');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/', upload.single('credentials'), async (req, res) => {
  try {
    const { email, password, license, expertise, years, institution } = req.body;
    const credentialsUrl = req.file ? req.file.path : '';
    const therapist = new Therapist({
      email,
      password,
      license,
      expertise: Array.isArray(expertise) ? expertise : [expertise],
      years,
      institution,
      credentialsUrl,
    });
    await therapist.save();
    res.status(201).json({ message: 'Therapist registered', therapist });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
