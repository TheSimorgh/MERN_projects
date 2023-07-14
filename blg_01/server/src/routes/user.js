const express = require("express");
const { register, login ,getProfile,getme} = require("../ctrl/user");
const isLoggin = require("../middleware/isLoggin");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id",isLoggin, getProfile);
router.get("/profile1/",isLoggin, getme);

module.exports = router;
