import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middleware/token.middleware.js";
import reviewCtrl from "../controllers/review.ctrl.js";
const router = express.Router({ mergeParams: true });

router.get("/",tokenMiddleware.auth,reviewCtrl.getReviewsOfUser);
router.post(
    "/",
    tokenMiddleware.auth,
    body("mediaId")
      .exists().withMessage("mediaId is required")
      .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
    body("content")
      .exists().withMessage("content is required")
      .isLength({ min: 1 }).withMessage("content can not be empty"),
    body("mediaType")
      .exists().withMessage("mediaType is required")
      .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaTitle")
      .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
      .exists().withMessage("mediaPoster is required"),
    requestHandler.validate,
    reviewCtrl.create
  );


router.delete(
    "/:reviewId",
    tokenMiddleware.auth,
    reviewCtrl.remove
  );
  
  export default router;