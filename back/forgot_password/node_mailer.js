import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nahomgore@gmail.com',
      pass: 'bhoa qauk hfcw ibpp',
    },
  });

  export default transporter