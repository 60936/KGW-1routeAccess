const express = require('express');
const controller = require('./user');

const router = express.Router();

router.post("/auth/register", controller.registerUser);

module.exports = router;
