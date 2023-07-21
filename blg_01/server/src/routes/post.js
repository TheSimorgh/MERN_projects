const express = require("express");
const { get, getAll, get_all_post, get_one_post,claps,schedule, like_post,dislike_post, delete_post, update_post, create_post, view, get_pub_posts } = require("../ctrl/post");
const isLoggin = require("../middleware/isLoggin");
const storage = require("../utils/fileUpload");
const multer = require("multer");

const router = express.Router();
//! file upload middleware
const upload = multer({ storage });
// router.get("/", get);
router.get("/", isLoggin,get_all_post);
router.get("/public", get_pub_posts);
router.get("/:id", get_one_post);
router.post("/", isLoggin, upload.single("file"), create_post);
router.delete("/:id", isLoggin,delete_post);
router.put("/:id", isLoggin,upload.single("file"), update_post);
router.put("/likes/:id", isLoggin, like_post);
router.put("/dislikes/:id", isLoggin,dislike_post);
router.put("/claps",isLoggin,claps)
router.put("/schedule:postId",isLoggin,schedule)
router.put("/:id/post-view-count",isLoggin,view)


schedule
module.exports = router;
