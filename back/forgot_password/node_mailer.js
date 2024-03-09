import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nahomgore@gmail.com',
      pass: 'auut kvhp oumu qpqq',
    },
  });

  export default transporter