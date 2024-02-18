// CRUD operations>Create, Read(get), Update, Delete users.

// import user model
const User = require("../User");

// create regiter fn
exports.register = async (req, res, next) => {
  const { username, password } = req.body
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long"
    });
    }try{
      await User.create({username, password,}).then(user =>{
        res.status(200).json({
          message: "User created successfully",
          user,
        });
    });
    }catch(err) {
      res.status(401).json({
        message: "User not successfully created",
        error: error.message,
      });
    }
  };