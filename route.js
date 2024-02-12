const express = require('express');
const controller = require('./user');

const router = express.Router();

router.get('/views/route1', auth.admin, (req, res) => {
  res.render('route1'); // Assuming you have a view file for route1
});

router.get('/views/route2', auth.user, (req, res) => {
  res.render('route2'); // Assuming you have a view file for route2
});

module.exports = router;
