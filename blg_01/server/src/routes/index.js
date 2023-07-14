
const express =require("express")
const user =require("./user")
const post =require("./post")
const category =require("./category")
const comment =require("./comment")

const router = express.Router();

router.use("/user", user);
router.use("/post", post);
router.use("/category", category);
router.use("/comment", comment);

module.exports = router;