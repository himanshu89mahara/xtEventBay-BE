import express from "express";
import { userCreate, userLogin, userVerifyHash, userVerifyOTP } from "./user.controller";
const userRoutes = express.Router();

userRoutes.route("/login").post(userLogin)
userRoutes.route("/verify/hash").post(userVerifyHash);
userRoutes.route("/verify/otp").post(userVerifyOTP);
userRoutes.route('/create').post(userCreate);
export default userRoutes;
