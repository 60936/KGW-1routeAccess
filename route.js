const express = require('express');
const controller = require('./user');
const auth = require('./auth');

const router = express.Router();

router.get('/route1', auth.admin, (req, res) => {
  console.log('auth:',auth.admin);
  res.render('route1'); // Assuming you have a view file for route1
});

router.get('/route2', auth.user, (req, res) => {
  console.log('auth:',auth.user);
  res.render('route2'); // Assuming you have a view file for route2
});

module.exports = router;
