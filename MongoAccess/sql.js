const mysql = require('mysql2');

// Create a MySQL connection
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hochingD!3',
  database: 'users'
});

dbConnection.connect((error) => {
  if (error) {
    console.log('Error connecting MySQL DB', error);
  } else {
    console.log('MySQL connected!');
  }
}); // Connect to MySQL

module.exports = dbConnection;
