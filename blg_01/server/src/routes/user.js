const express = require("express");
const { register, login ,getProfile,getme, block_user,unblock_user, profile_viewers,unfollowing_user,following_user} = require("../ctrl/user");
const isLoggin = require("../middleware/isLoggin");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id",isLoggin, getProfile);
router.get("/profile1/",isLoggin, getme);
router.put("/block/:userIdToBlock",isLoggin, block_user);
router.put("/unblock/:userIdToUnBlock",isLoggin, unblock_user);
router.get("/profile-viewer/:userProfileId",isLoggin, profile_viewers);
router.put("/following/:userToFollowId",isLoggin, following_user); 
router.put("/unfollowing/:userToUnFollowId",isLoggin, unfollowing_user);


module.exports = router;
