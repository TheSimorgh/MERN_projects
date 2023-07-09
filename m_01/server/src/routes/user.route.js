import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userCtrl from "../controllers/user.ctrl.js";


const router = express.Router();

router.post("/signup", body("username")
.exists().withMessage("username is required")
.isLength({ min: 8 }).withMessage("username minimum 8 characters")
.custom(async value => {
  const user = await userModel.findOne({ username: value });
  if (user) return Promise.reject("username already used");
}),
body("password")
.exists().withMessage("password is required")
.isLength({ min: 8 }).withMessage("password minimum 8 characters"),
body("confirmPassword")
.exists().withMessage("confirmPassword is required")
.isLength({ min: 8 }).withMessage("confirmPassword minimum 8 characters")
.custom((value, { req }) => {
  if (value !== req.body.password) throw new Error("confirmPassword not match");
  return true;
}),
body("displayName")
.exists().withMessage("displayName is required")
.isLength({ min: 8 }).withMessage("displayName minimum 8 characters"),
requestHandler.validate,
userCtrl.signup

)

router.post(
    "/signin",
    body("username")
      .exists().withMessage("username is required")
      .isLength({ min: 8 }).withMessage("username minimum 8 characters"),
    body("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
    requestHandler.validate,
    userCtrl.signin
  );
  


router.put(
    "/update-password",
    tokenMiddleware.auth,
    body("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
    body("newPassword")
      .exists().withMessage("newPassword is required")
      .isLength({ min: 8 }).withMessage("newPassword minimum 8 characters"),
    body("confirmNewPassword")
      .exists().withMessage("confirmNewPassword is required")
      .isLength({ min: 8 }).withMessage("confirmNewPassword minimum 8 characters")
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) throw new Error("confirmNewPassword not match");
        return true;
      }),
    requestHandler.validate,
    userCtrl.updatePassword
  );


  router.get(
    "/info",
    tokenMiddleware.auth,
    userCtrl.getInfo
  );