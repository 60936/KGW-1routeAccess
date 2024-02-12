const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hochingD!3',
  database: 'users'
});

connection.connect(); // Connect to MySQL

// Define the User model functions
const User = {
  findOne: (criteria, callback) => {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [criteria.username, criteria.password], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length > 0) {
        return callback(null, results[0]);
      } else {
        return callback(null, null);
      }
    });
  }
};

module.exports = User;