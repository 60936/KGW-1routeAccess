const express = require('express');
const mysql = require('mysql2'); // Import MySQL library
const app = express();
const auth = require('./auth');
const routeRouter = require('./route');
const User = require('./user'); // Import the User model

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
// AUTH ROUTE*
app.post('/authenticate', (req, res) => {
  const { username, password } = req.body;

  // USER ROUTE* Query the database for the user's credentials using the User model
  User.findOne({ name:username, password:password }, (err, foundUser) => {
    if (err || !foundUser) {
      return res.status(401).send('Unauthorized');
    }
 // Proceed with authentication logic based on user data
    if (foundUser.password === password) {
      if (foundUser.role === 'admin') {
        res.redirect('/views/route1');
      } else if (foundUser.role === 'user') {
        res.redirect('/views/route2');
      } else {
      res.status(401).send('Unauthorized');
    }
    }  
   
  }); // USER ROUTE***
});// AUTH ROUTE***

//Getting protected routes
app.get('/views/route1', auth.admin, (req, res) => {
  res.render('route1');
});

app.get('/views/route2', auth.user, (req, res) => {
  res.render('route2');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port: ' + port);
});