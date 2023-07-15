const express = require("express");
const { register, login ,getProfile,getme, block_user} = require("../ctrl/user");
const isLoggin = require("../middleware/isLoggin");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id",isLoggin, getProfile);
router.get("/profile1/",isLoggin, getme);
router.get("/block/:userIdToBlock",isLoggin, block_user);
module.exports = router;
