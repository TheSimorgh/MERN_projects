import express from "express";
import personCtrl from "../controllers/person.ctrl.js";


const router = express.Router({ mergeParams: true });
router.get("/:personId/medias", personCtrl.personMedias);
router.get("/:personId", personCtrl.personDetail);


export default router;
