import nodemailer from "nodemailer";
const transport = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'himanshumahara.ps@gmail.com',
        pass: 'npzjualyujzovpdz'
    }
});

const mailOptions = {
    from: 'himanshumahara.ps@gmail.com', // sender address
    to: 'himanshumahara.ps@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
  };


const sendMail = async (mailOptions,) =>{
    try{
       return  await transport.sendMail(mailOptions);
    }catch(err){
       throw new error(err);
    }
    
    

}
export default sendMail;