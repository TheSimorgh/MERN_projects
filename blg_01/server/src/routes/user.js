const express = require("express");
const { register, login ,getme,get_pub_profile,upload_profile_img, upload_cover_img,block_user,unblock_user,forgot_password, reset_password,profile_viewers,unfollowing_user,following_user, account_verification_email, account_verification, get_my_profile} = require("../ctrl/user");
const isLoggin = require("../middleware/isLoggin");
const storage = require("../utils/fileUpload");
const multer = require("multer");

const router = express.Router();
//! file upload middleware
const upload = multer({ storage });
router.put("/upload-profile-img",isLoggin,  upload.single("file"),upload_profile_img)
router.put("/upload_cover_img",isLoggin,  upload.single("file"),upload_cover_img)

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", get_pub_profile);
router.get("/profile/",isLoggin, get_my_profile);
router.put("/block/:userIdToBlock",isLoggin, block_user);
router.put("/unblock/:userIdToUnBlock",isLoggin, unblock_user);
router.get("/profile-viewer/:userProfileId",isLoggin, profile_viewers);
router.put("/following/:userToFollowId",isLoggin, following_user); 
router.put("/unfollowing/:userToUnFollowId",isLoggin, unfollowing_user);
router.post("/reset-password/:resetToken", reset_password);
router.post("/forgot-password", forgot_password);
router.put("/account-verification-email", isLoggin,account_verification_email);
router.post("/account-verification/:verifyToken", isLoggin, account_verification);


module.exports = router;
