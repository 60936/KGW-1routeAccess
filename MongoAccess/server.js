const express = require('express');
const app = express();
const connectDB = require('./db');
const cookieParser = require("cookie-parser");

app.use(cookieParser());
// Connecting the Database
// No need to call a function; use the connection object directly
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.log('listening on port',PORT));

// Handling Error
process.on("unhandledRejection", err=>{
  console.log(`An erro occurred: ${err.message}`);
  server.close(()=>process.exit(1)); 
})

// create async express fn taking user's data & reg in DB
app.use(express.json());

// import route,js as middleware
app.use("/api/auth", require("./auth/route"))