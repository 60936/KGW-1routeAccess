const auth = require('basic-auth');
const User = require('./user'); // Assuming you have a User model for interacting with user data

const getAuthorizer = (req, res, next) => {
  const user = auth(req);

  if (!user) {
    return res.status(401).send('Unauthorized');
  }

  // Query the database for the user based on the provided credentials
  User.findOne({ username: user.name, password: user.pass }, (err, foundUser) => {
    if (err || !foundUser) {
      return res.status(401).send('Unauthorized');
    }

    // You can also check for user roles or permissions here if needed

    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { getAuthorizer };