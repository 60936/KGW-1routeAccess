const auth = require('basic-auth');
const mysql = require('mysql2');
const User = require('./user'); // Import User model

const auth = (req, res, next) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect('/views/login');
  }

  if (user.role === 'admin') {
    return next();
  }

  return res.redirect('/');
};

module.exports = {
  admin: auth,
  user: (req, res, next) => {
    const user = req.session.user;

    if (!user) {
      return res.redirect('/views/login');
    }

    if (user.role === 'user') {
      return next();
    }

    return res.redirect('/');
  }
};
