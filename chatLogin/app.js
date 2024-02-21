// Install required packages: express, express-session, body-parser, and a database driver (e.g., mysql, mongodb)

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Simulated user database (replace with your actual database)
const users = [
  { id: 1, username: 'user1', password: 'pw123' },
  // Add more users...
];

// Routes
app.get('/', (req, res) => {
  // Check if user is authenticated (session exists)
  if (req.session.userId) {
    // Serve the protected HTML page
    res.sendFile(__dirname + '/protected.html');
  } else {
    // Redirect to login page
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  // Serve the login form
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Set session data
    req.session.userId = user.id;
    res.redirect('/');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/logout', (req, res) => {
  // Destroy session and redirect to login page
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
