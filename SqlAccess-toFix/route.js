const express = require('express');
const auth = require('./auth');

const routeRouter = express.Router();

// Mount the route router
app.use('/views', routeRouter);

// Middleware to parse incoming req bodies
app.use(express.urlencoded({ extended: true }));

// Using template engines
app.set('view engine', 'ejs');

app.get('/views', (req, res) => {
  console.log('redirect:',app.get);
  res.render('login'); // Assuming you have a view file for route2
});

routeRouter.get('/route1', auth.admin, (req, res) => {
  console.log('auth:',auth.admin);
  res.render('route1'); // Assuming you have a view file for route1
});

routeRouter.get('/route2', auth.user, (req, res) => {
  console.log('auth:',auth.user);
  res.render('route2'); // Assuming you have a view file for route2
});


module.exports = routeRouter;
