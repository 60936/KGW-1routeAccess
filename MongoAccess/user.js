// user.js
const Mongoose = require('mongoose');
const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
});

const User = Mongoose.model('User', UserSchema);

module.exports = User;

// created user model 1st argument: user, 
// 2nd arguement: username 