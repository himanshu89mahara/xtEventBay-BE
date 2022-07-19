import jsonwebtoken from "jsonwebtoken";
import { formattedErros } from "../utils/mongoose";
import UserModel from "./user.model";

const jwt = jsonwebtoken;

export const checkAuth = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"] || "";
  const bearerArray = bearerHeader.split(" ");
  const token = bearerArray[1] !== undefined ? bearerArray[1] : "";
  if (!token) {
    res.json({
      status: false,
      errorCode: 401,
      errMessage: "Authorizatin failed.",
    });
    return;
  }

  req.token = token;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
    if (err) {
      // res.sendStatus(403);
      res.json({
        status: false,
        errorCode: 401,
        errMessage: "Authorizatin failed.",
      });
    } else {
      req.user = data.user;
      next();
    }
  });
};

export const validateUser = async (req, res, next) => {
  const email = req.body.email;
  const verifyKey = req.body.verifyKey || "";
  const otp = req.body.otp || "";

  const user = new UserModel({ email, verifyKey, otp });
  try {
    const errors = await user.validate();
    if (errors) {
      res.json({
        status: false,
        errors: formattedErros(errors),
      });
    } else {
      next();
    }
  } catch (err) {
    const errors = err;
    res.json({
      status: false,
      errors: formattedErros(errors),
    });
  }
  //console.log(errors);
};
