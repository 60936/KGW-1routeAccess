const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hochingD!3',
  database: 'users'
});

connection.connect((error)=>{
  if (error){
    console.log('Error connecting MySQL DB', error);
  }else{
    console.log('MySQL connected!');
  }
}); // Connect to MySQL

// Define the User model functions
const User = {
  findOne: (criteria, callback) => {
    const query = 'SELECT * FROM users WHERE name = ? AND password = ?';
console.log('Executing query:', query);
console.log('Checking criteria:', criteria);

    connection.query(query, [criteria.name, criteria.password], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length > 0) {
        console.log('User found:', results[0]);
        return callback(null, results[0]);
      } else {
        console.log('User not found:');
        return callback(null, null);
      }
    });
  }
};


module.exports = User;