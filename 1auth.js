const auth = require('basic-auth');
const mysql = require('mysql2');
const User = require('./user'); // Import User model


const admin = (req, res, next) => {
  const user = auth(req);

  
  // Query the database for the user based on the provided credentials
  User.findOne({ name: user.name, password: user.pass }, (err, foundUser) => {
    if (err || !foundUser) {
      return res.status(401).send('Unauthorized');
    }
    if (foundUser.password === password) {
      if (foundUser.role === 'admin') {
        next();
      } else {
      res.status(401).send('Unauthorized');
      }
    }  
     // Proceed to the next middleware or route handler
  });
};

const user = (req, res, next) => {
  const user = auth(req);

  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  if (foundUser.password === password) {
    if (foundUser.role === 'user') {
      next();
    } else {
    res.status(401).send('Unauthorized');
    }
  }  
 

   // Proceed to the next middleware or route handler
};

module.exports = { admin, user };