import express from "express";
import mediaCtrl from "../controllers/media.ctrl.js";
const router = express.Router({ mergeParams: true });

router.get("/search", mediaCtrl.search);

router.get("/genres", mediaCtrl.getGenres);

router.get("/detail/:mediaId", mediaCtrl.getDetail);

router.get("/:mediaCategory", mediaCtrl.getList);

export default router;