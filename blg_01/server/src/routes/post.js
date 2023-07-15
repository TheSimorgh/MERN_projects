const express = require("express");
const { get, getAll, get_all_post, get_one_post,  delete_post, update_post, create_post } = require("../ctrl/post");
const isLoggin = require("../middleware/isLoggin");
const router = express.Router();

// router.get("/", get);
router.get("/", get_all_post);
router.get("/:id", get_one_post);
router.post("/", isLoggin, create_post);
router.delete("/:id", isLoggin,delete_post);
router.put("/:id", isLoggin,update_post);
module.exports = router;