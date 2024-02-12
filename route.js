const express = require('express');
const controller = require('./auth');

const router = express.Router();

router.post("/auth/register", controller.registerUser);

module.exports = router;
