const auth = require('basic-auth');
const mysql = require('mysql2');
const User = require('./user'); // Import User model

const authenticate = (req, res, next) => {
  const user = req.session.user;
  console.log(user.role);
  if (!user) {
    return res.redirect('/views/login');
  }

  if (user.role === 'admin') {
    return next();
  }

  return res.redirect('/');
};

module.exports = {
  admin: authenticate,
  user: (req, res, next) => {
    const user = req.session.user;

    if (!user) {
      return res.redirect('/login');
    }

    if (user.role === 'user') {
      return next();
    }

    return res.redirect('/');
  }
};
