// CRUD operations>Create, Read(get), Update, Delete users.

// import user model
const User = require("../User");

// create register fn
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

  // update role fn
  exports.update = async (req, res, next) => {
    const { role, id } = req.body
    // Verifying if role and id is present
    if (role && id) {
      // Verifying if the value of role is admin
      if (role === "admin") {
        await User.findById(id).then((user) => {
          // Third - Verifies the user is not an admin
          if (user.role !== "admin") {
            user.role = role;
            user.save((err) => {
              //Monogodb error checker
              if (err) {
                res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res.status("201").json({ message: "Update successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
      } else {
        res.status(400).json({
          message: "Role is not admin",
        })
      }
    } else {
      res.status(400).json({ message: "Role or Id not present" })
    }
  }

  // delete user fn
  exports.deleteUser = async (req, res, next) => {
    const { id } = req.body
    await User.findById(id)
      .then(user => user.remove())
      .then(user =>
        res.status(201).json({ message: "User successfully deleted", user })
      )
      .catch(error =>
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message })
      )
  }