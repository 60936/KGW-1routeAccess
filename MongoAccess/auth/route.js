// create route to /register
const express = require("express")
const router = express.Router()

// import register fn in routes to be use as route's fn
const { register } = require("./Auth")
router.route("/register").post(register)

module.exports = router