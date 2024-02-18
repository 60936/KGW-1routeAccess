const express = require('express');
const PORT = 5000;
const dbConnection = require('./sql');

// Connecting the Database
// No need to call a function; use the connection object directly
app.listen(PORT, ()=>console.log('listening on port',PORT));

// Handling Error
process.on("unhandledRejection", err=>{
  console.log(`An erro occurred: ${err.message}`);
  server.close(()=>process.exit(1)); 
})

// create async express fn taking user's data & reg in DB
const app = express();
app.use(express.json());

// import route,js as middleware
app.use("/api/auth", require("./Auth/route"))