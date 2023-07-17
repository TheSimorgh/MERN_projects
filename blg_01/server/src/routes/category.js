const express = require("express");
const isLoggin = require("../middleware/isLoggin");
const { get_all_category, create_category, delete_category, update_category } = require("../ctrl/category");
const storage = require("../utils/fileUpload");
const multer = require("multer");

const router = express.Router();
//! file upload middleware
const upload = multer({ storage });

// router.get("/", get);
router.get("/", get_all_category);
router.post("/", isLoggin, create_category);
router.delete("/:id",isLoggin,delete_category);
router.put("/:id",isLoggin,update_category);


module.exports = router;
