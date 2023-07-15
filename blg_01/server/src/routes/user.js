const express = require("express");
const { register, login ,getProfile,getme, block_user,unblock_user} = require("../ctrl/user");
const isLoggin = require("../middleware/isLoggin");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id",isLoggin, getProfile);
router.get("/profile1/",isLoggin, getme);
router.get("/block/:userIdToBlock",isLoggin, block_user);
router.get("/unblock/:userIdToBlock",isLoggin, unblock_user);

module.exports = router;
