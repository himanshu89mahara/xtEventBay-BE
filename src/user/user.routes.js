import express from "express";
import { userAuth, userCreate, userLogin, userVerifyHash, userVerifyOTP } from "./user.controller";
const userRoutes = express.Router();

userRoutes.route("/login").post(userLogin)
userRoutes.route("/verify/hash").post(userVerifyHash);
userRoutes.route("/verify/otp").post(userVerifyOTP);
userRoutes.route('/create').post(userCreate);
userRoutes.route('/auth').post(userAuth);
export default userRoutes;
