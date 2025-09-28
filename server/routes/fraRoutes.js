// /routes/fraRoutes.js
const express = require('express');
const router = express.Router();
const fraController = require('../controllers/fraController');

router.get('/claims', fraController.getAllClaims);
router.post('/claims', fraController.createClaim);
router.post('/generate-description', fraController.generateDescription);

module.exports = router;