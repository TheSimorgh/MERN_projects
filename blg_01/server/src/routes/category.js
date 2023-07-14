const express = require("express");
const { get } = require("../ctrl/category");
const router = express.Router();

router.get("/", get);

module.exports = router;
