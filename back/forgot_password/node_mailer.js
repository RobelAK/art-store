import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nahomgore@gmail.com',
      pass: 'hrry hqzh ycck xkhb',
    },
  });

  export default transporter