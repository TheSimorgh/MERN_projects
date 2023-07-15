const express = require("express");
const { get, getCategories, createCategory, deleteCategories, updateCategories } = require("../ctrl/category");
const isLoggin = require("../middleware/isLoggin");
const router = express.Router();

router.get("/", get);
router.get("/", getCategories);
router.post("/", isLoggin, createCategory);
router.delete("/:id",isLoggin,deleteCategories)
router.put("/:id",isLoggin,updateCategories)


module.exports = router;
