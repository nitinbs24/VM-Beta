// /controllers/fraController.js
const db = require('../db');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getAllClaims = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT id, claimant_name, ST_AsGeoJSON(location) as location FROM fra_claims');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createClaim = async (req, res) => {
  try {
    const { claimant_name, latitude, longitude } = req.body;
    const newClaim = await db.query(
      'INSERT INTO fra_claims (claimant_name, location) VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326)) RETURNING *',
      [claimant_name, longitude, latitude]
    );
    res.json(newClaim.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.generateDescription = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ response: text });
    } catch (error) {
        console.error("Error calling AI API:", error);
        res.status(500).json({ error: "Failed to generate AI content." });
    }
};