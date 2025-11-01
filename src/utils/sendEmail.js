import nodemailer from "nodemailer";

export const sendmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,         
      secure: true,
      auth: {
        user: "darshan.gadakh.cmaug25@gmail.com",
        pass: "odot zzfk mfqz tmar", 
      },
    });

    const mailOptions = {
      from: "darshan.gadakh.cmaug25@gmail.com",
      to: to, 
      subject: subject, 
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent:", info.response);
    return info;
  } catch (error) {
    console.error(" Email sending failed:", error);
    throw error;
  }
};

export const sendmailWithsender = async (from,to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,         
      secure: true,
      auth: {
        user: "darshan.gadakh.cmaug25@gmail.com",
        pass: "odot zzfk mfqz tmar", 
      },
    });

    const mailOptions = {
      from: from,
      to: to, 
      subject: subject, 
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent:", info.response);
    return info;
  } catch (error) {
    console.error(" Email sending failed:", error);
    throw error;
  }
};

