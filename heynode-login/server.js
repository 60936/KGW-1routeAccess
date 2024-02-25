const express = require('express'); // take express library
const app = express(); //create express application

const bodyParser = require('body-parser'); //middleware
//And our application is going to use body-parser:
app.use(bodyParser.urlencoded({ extended: false }));

// Route to homepage
app.get('/',(req,res) =>{
  res.sendFile('static/index.html', {root : __dirname});
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile('static/login.html', {root : __dirname});
});

app.post('/login', (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} Password: ${password}`);
});

const port = 3000 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));