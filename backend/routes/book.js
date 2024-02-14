const express = require("express")
const bookCtrl = require("../controllers/book")
const router = express.Router()
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.get("/", bookCtrl.getAllBooks)
router.get("/:id", bookCtrl.getOneBook)

router.post("/", auth, multer, bookCtrl.addBook)

module.exports = router