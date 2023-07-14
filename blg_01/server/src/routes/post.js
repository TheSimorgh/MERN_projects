const express = require("express");
const { get } = require("../ctrl/post");
const router = express.Router();

router.get("/", get);

module.exports = router;
