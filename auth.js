const auth = require('basic-auth');
const User = require('./user'); // Assuming you have a User model for interacting with user data

const admin = (req, res, next) => {
  const user = auth(req);

  if (!user) {
    return res.status(401).send('Unauthorized');
  }

  // Query the database for the user based on the provided credentials
  User.findOne({ name: user.name, password: user.pass }, (err, foundUser) => {
    if (err || !foundUser) {
      return res.status(401).send('Unauthorized');
    }
    if (foundUser.password === password) {
      if (foundUser.role === 'admin') {
        res.redirect('/views/route1');
      } else {
      res.status(401).send('Unauthorized');
      }
    }  
    next(); // Proceed to the next middleware or route handler
  });
};

const user = (req, res, next) => {
  const user = auth(req);

  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  if (foundUser.password === password) {
    if (foundUser.role === 'user') {
      res.redirect('/views/route2');
    } else {
    res.status(401).send('Unauthorized');
    }
  }  
  // Additional logic for handling regular user authentication can be added here

  next(); // Proceed to the next middleware or route handler
};

module.exports = { admin, user };