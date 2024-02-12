const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/user");




// middleware user inscription 
router.post("/signup", userCtrl.createUser);


// middleware user login
router.post("/login", userCtrl.loginUser)

module.exports = router