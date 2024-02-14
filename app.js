const express = require('express');
const app = express();
const auth = require('./auth');
const routeRouter = require('./route');

// Mount the route router
app.use('/views', routeRouter);

// Middleware to parse incoming req bodies
app.use(express.urlencoded({ extended: true }));

// Using template engines
app.set('view engine', 'ejs');

// Route to load login page
app.get('/', (req, res) => {
  res.render('login');
});

// AUTH ROUTE
app.post('/authenticate', (req, res) => {
  const { username, password } = req.body;

  // Call the findOne function from the User model in auth.js
  auth.User.findOne({ name: username, password: password }, (error, user) => {
    if (error) {
      console.error('Error finding user:', error);
      return res.status(500).send('Internal Server Error');
    }

    if (!user) {
      return res.redirect('/login');
    }

    // Store user data in session

    if (user.role === 'admin') {
      return res.redirect('/route1');
    } else if (user.role === 'user') {
      return res.redirect('/route2');
    } else {
      return res.redirect('/login');
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port: ' + port);
});