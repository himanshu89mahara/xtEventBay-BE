import nodemailer from "nodemailer";
import logger from "./logger";
import dotenv from "dotenv";
dotenv.config();

const SMTP_USER= process.env.SMTP_USER;
const SMTP_PASSWORD=process.env.SMTP_PASSWORD;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_USER, 
    pass: SMTP_PASSWORD,
  },
});

const mailOptions = {
  from: "himanshumahara.ps@gmail.com", // sender address
  to: "himanshumahara.ps@gmail.com", // list of receivers
  subject: "Subject of your email", // Subject line
  html: "<p>Your html here</p>", // plain text body
};

// const sendMail = async (mailOptions) => {
//   try {
//     return await transport.sendMail(mailOptions);
//   } catch (err) {
//     throw new error(err);
//   }
// };
const sendMail = async (to, subject, html,from) => {
  if(process.env.SMTP_DEBUG==='true'){
      logger.log('info',`from : ${from} \n to: ${to} \n subject:${subject} \n html: ${html}`);
      return true;
  }else{
    try {
      return await transport.sendMail({from,to,subject,html});
    } catch (err) {
      logger.log('error',err.stack);
        
      throw new error(err);
    }

  }  
  
};
export default sendMail;
