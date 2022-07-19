import jsonwebtoken from "jsonwebtoken";
import { findEmployee } from "../utils/employee";
import { generateHash, hashMatch } from "../utils/hash";
import { generate } from "../utils/keyCode";
import logger from "../utils/logger";
import sendMail from "../utils/mailer";
import UserModel, { generateObjectId } from "./user.model";

const jwt = jsonwebtoken;

export const userLogin = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await findEmployee(email);
    if (user) {
      const otp = generate();
      const hashOTP = await generateHash(otp);
      const verifyKey = generateObjectId();
      const verifyURL = `${req.protocol}://${req.headers.host}/user/verify/${verifyKey}`;

      await UserModel.updateOne(
        { email: req.body.email },
        { email: req.body.email, otp: hashOTP, verifyKey },
        { upsert: true, runValidators: true }
      );
      const html = `
        <p>OTP: <b> ${otp}</b> </p>
       <p>URL: </p><a href="${verifyURL}">Click Here</a>
      `;

      await sendMail(
        email,
        "XtEventBay - Verify Email",
        html,
        "himanshumahara.ps@gmail.com"
      );
      res.json({
        status: true,
        verifyURL,
        email,
      });
    } else {
      res.json({
        status: false,
        error: {
          email: "Email is not found",
        },
      });
    }
  } catch (err) {
    logger.log({ level: "error", message: err.message });
    res.json({
      status: false,
      error: err.message || "Something went wrong.",
    });
  }
};
export const userVerifyHash = async (req, res) => {
  const verifyKey = req.body.hash;

  const user = await UserModel.findOne({ verifyKey });
  if (user && user.otp) {
    res.json({
      status: true,
      user: {
        email: user.email,
        _id: user._id,
      },
    });
  } else {
    res.json({
      status: false,
      message: "Verify url has been expired.",
    });
  }
};

export const userVerifyOTP = async (req, res) => {
  const verifyKey = req.body.hash;
  const otp = req.body.otp;
  const user = await UserModel.findOne({ verifyKey: verifyKey });
  if (user) {
    try {
      const otpMatched = await hashMatch(otp, user.otp);
      if (otpMatched) {
        const userData = await findEmployee(user.email);
        const token = jwt.sign({ user:userData,expiredOn: new Date(new Date().setDate(new Date().getDate() + 2)) }, process.env.JWT_SECRET_KEY);
        user.otp = '';
        user.verifyKey='';
        user.save();
        res.json({
          status: true,
          message: "OTP matched",
          token,
        });
      } else {
        res.json({
          status: false,
          message: "OTP is wrong.",
        });
      }
    } catch (err) {
      logger.log("error", err.stack);
      res.json({
        status: false,
        message: "Something went wrong. Try again",
      });
    }
  } else {
    res.json({
      status: false,
      message: "Verify key has been expired.",
    });
  }
};

export const userAuth = async (req, res) => {
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
      const tokenExpiryDate = new Date(data.expiredOn);
      const currentDate = new Date();
      if(currentDate > tokenExpiryDate){
        res.json({
          status: false,
          errorCode: 402,
          errMessage: "Authorization failed",
        });
        
      }else{
        req.user = data.user;
        delete req.user.otp;
        delete req.user.verifyKey;
        res.json({
          status: true,
          user: req.user,
        });
      

      }
      
    }

    //res.send("User Auth");
  });
};
export const userCreate = (req, res) => {
  res.send(
    `User POST Create Profile Input take Oracle ID ${req.body.oracleId} and Carreir Stage ${req.body.careerStage} and Capebility: ${req.body.primaryCapability}`
  );
};
