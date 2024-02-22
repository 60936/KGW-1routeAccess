const express = require('express');
const router = express.Router();
const auth = require('./auth'); // Import auth module

router.get('/', auth.isAuthenticated, (req, res) => {
  // Serve the protected HTML page
  res.sendFile(__dirname + '/protected.html');
});

router.get('/login', (req, res) => {
  // Serve the login form
  res.sendFile(__dirname + '/login.html');
});

router.post('/login', auth.authenticateUser, (req, res) => {
  res.redirect('/');
});

router.get('/logout', auth.logoutUser, (req, res) => {
  res.redirect('/login');
});

module.exports = router;
