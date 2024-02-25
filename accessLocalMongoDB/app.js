var MongoClient = require('mongodb').MongoClient;

// Connect to the db

MongoClient.connect('mongodb://localhost:27017/MyDb', function(err, db) {

db.collection('Persons', function(err, collection) {
  collection.insert({id:1,name:'user',password:'123'});
  db.collection('Persons').count(function(err, count) {
if (err) throw err;
  console.log("Total Rows: " + count);
});
});
});