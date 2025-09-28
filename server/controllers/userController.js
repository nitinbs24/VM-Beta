// /server/controllers/userController.js
const db = require('../db');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const { email, password, aadhaar_number } = req.body;

    // Basic validation
    if (!email || !password || !aadhaar_number) {
        return res.status(400).json({ message: "Please provide email, password, and Aadhaar number." });
    }

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insert new user into the database
        const newUser = await db.query(
            "INSERT INTO users (email, password_hash, aadhaar_number) VALUES ($1, $2, $3) RETURNING id, email",
            [email, password_hash, aadhaar_number]
        );

        res.status(201).json({
            message: "User created successfully!",
            user: newUser.rows[0]
        });

    } catch (err) {
        console.error(err.message);
        // Handle potential duplicate email/aadhaar error
        if (err.code === '23505') {
            return res.status(400).json({ message: "Email or Aadhaar number already exists." });
        }
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password." });
    }

    try {
        // Check if user exists
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // For a real app, you'd generate a JWT here
        res.status(200).json({ message: "Logged in successfully!" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};