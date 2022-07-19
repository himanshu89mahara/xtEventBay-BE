import express from "express";
import { userAuth, userCreate, userLogin, userVerifyHash, userVerifyOTP } from "./user.controller";
import { checkAuth, validateUser } from "./user.middleware";
const userRoutes = express.Router();

userRoutes.use(validateUser).route("/login").post(userLogin)
userRoutes.route("/verify/hash").post(userVerifyHash);
userRoutes.route("/verify/otp").post(userVerifyOTP);
userRoutes.use(checkAuth).route('/create').post(userCreate);
userRoutes.route('/auth').post(userAuth);
export default userRoutes;
