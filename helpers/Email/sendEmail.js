
"use strict";
const nodemailer = require("nodemailer");

exports.sendEmail = async (emailInfo) => {
    try {
        const transporter = nodemailer.createTransport(
            emailInfo.smtpClient
        );

        const mailOptions = {
            from: '"Oscar Rosete 👻" <oscar.rosete@oscarrosete.com>', // sender address
            to: emailInfo.to, 
            subject: emailInfo.subject, 
            html: emailInfo.htmlContent ,
            attachments:emailInfo.attachments
        };
        const info = await transporter.sendMail(mailOptions)

        // only for debugging purposes
        // console.log("===mail options")
        // console.log(mailOptions)
        // console.log("Message sent: %s", info.messageId);
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return true;
    } catch (error) {
        console.log("Nodemailer error: "+error)
        return false;
    }
}

