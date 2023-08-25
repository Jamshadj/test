import nodemailer from "nodemailer"

export default function sentOTP(email, otp) {

  return new Promise((resolve, reject) => {
    console.log("hy");
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
      port: 465, // Port for SMTP (usually 465)
      secure: true,
      tls: {
        rejectUnauthorized: false
      }, // Usually true if connecting to port 465
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: proces.env.NODEMAILERPASSWORD,
      },
    });

    var mailOptions = {
      from: "process.env.NODEMAILER_EMAIL",
      to: email,
      subject: "StaySpot Email verification",
      html: `
              <h1>Verify Your Email For stayspot</h1>
                <h3>use this code to verify your email</h3>
                <h2>${otp}</h2>
              `,
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("email sent error ", error)
        reject(error)
      } else {
        console.log("email sent successfull")
        resolve(otp)
      }
    });

  })
}
