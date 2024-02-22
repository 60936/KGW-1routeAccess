const mysql = require('mysql2');



// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'oops',
  database: 'users'
});

connection.connect((error) => {
  if (error) {
    console.log('Error connecting MySQL DB', error);
  } else {
    console.log('MySQL connected!');
  }
}); // Connect to MySQL

// Define the User model functions
const User = {
  findOne: (criteria, callback) => {
    const query = 'SELECT * FROM login WHERE name = ? AND password = ?';
    console.log('Executing query:', query);
    console.log('Checking criteria:', criteria);

    connection.query(query, [criteria.name, criteria.password], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return callback(error, null);
      }
      if (results.length > 0) {
        console.log('User found:', results[0]);
        return callback(null, results[0]);// it means that the user was found, and the function returns the user object. If no results are found, the function returns null.
      } else {
        console.log('User not found:');
        return callback(null, null);
      }
    });
  }
};

const authenticate = (req, res, next) => {
  const user = req.session.user;
  console.log(user.role);
  
  if (!user) {
    // return res.redirect('/views/login');
    return next();
  }

  if (user.role === 'admin') {
    return next();
  }

  // return res.redirect('/views/login');
};

module.exports = {
  User,
  admin: authenticate,
  user: (req, res, next) => {
    const user = req.session.user;

    if (!user) {
      return res.redirect('/');
      // return next();
    }

    if (user.role === 'user') {
      return next();    }

    // return res.redirect('/views/login');
  }
};
