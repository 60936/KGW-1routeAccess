const express = require('express');
const app = express();
const auth = require('./auth');

// Middleware to parse incoming req bodies
app.use(express.urlencoded({ extended: true }));

// Using template engines
app.set('view engine', 'ejs');

// Route to load login page
app.get('/', (req, res) => {
  res.render('login');
});

// AUTH ROUTE
app.post('/authenticate', (req, res, next) => {
  const { username, password } = req.body;

  // Call the findOne function from the User model in auth.js
  auth.User.findOne({ name: username, password: password }, (error, user) => {
    if (error) {
      console.error('Error finding user:', error);
      return next(error);
    }

    // Store user data in session

    if (user.role === 'admin') {
      return res.redirect('/route1');
    } else if (user.role === 'user') {
      return res.redirect('/route2');
    } else {
      return res.render('/login');
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, (error) => {
  if (error) {
    console.error('Error starting server:', error);
  } else {
    console.log('App listening on port: ' + port);
  }
});