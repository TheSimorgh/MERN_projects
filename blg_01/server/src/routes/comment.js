const express = require("express");
const {  get, create_comment, update_comment, delete_comment } = require("../ctrl/comment");
const isLoggin = require("../middleware/isLoggin");
const router = express.Router();

router.get("/", get);
router.post("/:postId", isLoggin,create_comment);
router.put("/:id",isLoggin,  update_comment);
router.delete("/:id",isLoggin, delete_comment);
module.exports = router;
