const nodemailer = require('nodemailer')
const userDet = require('./config/userDetails')

const OAuth2_Client = new OAuth2(
  userDet.clientId,
  userDet.clientSecret,
  "https://developers.google/playground"
);
OAuth2_Client.setCredentials({
  refresh_token: userDet.refreshToken,
});
const accessToken = OAuth2_Client.getAccessToken(); // this is how to get the access token, not from your google oauth
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: userDet.user,
    clientId: userDet.clientId,
    clientSecret: userDet.clientSecret,
    refreshToken: userDet.refreshToken,
    accessToken: accessToken,
  },
});



const verifyMail = async ({ firstname, id, email }) => {
  try {
    const mailOptions = {
      from: "medlink005@gmail.com",
      to: email,
      subject: `Verification Email For ${email} as Doctor`,
      html: `
      <div style=" background-color:rgb(35, 34, 34); overflow: auto;  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap'); width:90%;margin: auto; padding: 10px;">
      <img src="https://res.cloudinary.com/dba1aezsn/image/upload/v1687622863/png_logo_r9wfzj.png" alt="" style="height: 30px; margin-top: 10px; margin-left: 10px;" >
          <p style="font-weight:700;color:white; font-size: 18px;font-weight:800;background: #A4DBAE59;width:70%; line-height: 27px; margin:auto;margin-top:15px;text-align:center; padding:10px; border-radius:7px; font-size:23px;">Unique Login Id</p>
        <p style="color: white; margin-bottom: 10px;">Dear Doctor ${firstname},</p>
        <p style="color: rgb(255, 255, 255);">We are pleased to inform you that your hospital ID has been generated and is ready for use. The assigned Doctor ID is </p>
        <p style="color: white; font-size:19px; background: #4D6051;
        width: 150px; border-radius: 20px; text-align: center; margin: auto;padding:10px; margin-bottom:20px; font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"><b>${id}</p>
        <p style="color: white;">
          Please ensure to keep this ID secure and use it for any future correspondence or transactions related to your hospital account. <br>
          If you have any questions or need further assistance, please don't hesitate to contact our support team at medlink005@gmail.com. We are here to help.
        </p> 
        <p style="color: white; margin-bottom: 10px;">Set your password on your first login</p> 
        <p style="color: white; margin-bottom: 10px;">Thank you for choosing our platform. We value your partnership and look forward to providing you with exceptional services.</p> <br>
        <p style="color: white; text-align: center;">Best regards,</p>
        <p style="color: white; text-align: center;">Medlink</p>
    </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};