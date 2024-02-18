const express = require('express');
const app = express();
const PORT = 5000;
const connectDB = require('./db');

app.listen(PORT, ()=>console.log('listening on port',PORT));

// Connecting the Database
connectDB();

// Handling Error
process.on("unhandledRejection", err=>{
  console.log(`An erro occurred: ${err.message}`);
  server.close(()=>process.exit(1)); 
})