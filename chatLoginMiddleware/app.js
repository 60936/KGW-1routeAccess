// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { authenticateUser } = require('./auth');
const { handleProtectedRoute } = require('./route');
const { setupSession } = require('./session');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Routes (using 2 middlewares here-setupSession, handleProtectedRoute)
app.get('/', setupSession, handleProtectedRoute, (req, res) => {
  // Serve the protected HTML page
  res.sendFile(__dirname + '/protected.html');
});

app.get('/login', (req, res) => {
  // Serve the login form
  res.sendFile(__dirname + '/login.html');
});

// using the 3rd middlewares here-authenticateUser
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const isAuthenticated = await authenticateUser(username, password);
  if (isAuthenticated) {
    req.session.userId = 1; // Set session data (replace with actual user ID)
    res.redirect('/');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
