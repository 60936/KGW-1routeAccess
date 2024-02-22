const bcrypt = require('bcrypt');
const users = [
  { id: 1, username: 'rger', passwordHash: '$2b$10$7q.jHUremsOVQFc9fwiHxOqnKSMAMKreuJIxWiegrfYcgAhyyBb4O' }, // Replace with hashed passwords
  // Add more users...
];

module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.session.userId) {
      next(); // User authenticated, proceed
    } else {
      res.redirect('/login'); // Redirect to login page
    }
  },

  authenticateUser: (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      req.session.userId = user.id;
      next(); // Valid credentials, proceed
    } else {
      res.status(401).send('Invalid credentials');
    }
  },

  logoutUser: (req, res, next) => {
    req.session.destroy(() => {
      next(); // Session destroyed, proceed
    });
  },
};
