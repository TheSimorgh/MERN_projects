const express = require("express");
const {  get, create_comment, update_comment, delete_comment } = require("../ctrl/comment");
const router = express.Router();

router.get("/", get);
router.post("/", create_comment);
router.put("/:id", update_comment);
router.delete("/:id", delete_comment);
module.exports = router;
