import nodemailer from 'nodemailer'
import config from '../../../config'

export async function sendMailer(subject: string, from: string, html: string) {
  // console.log(
  //   {
  //     user: config.nodeMailer.FromEmail, //! owner email
  //     pass: config.nodeMailer.appPassword,
  //   },
  //   '🚀 ~ file: sendMail.ts:5 ~ sendMailer ~ from:',
  //   from
  // )
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.', //!  gmail host and port for smtp ## Searchby= smtp host in browser
    port: 587, //!  port for smtp
    // secure: true,
    auth: {
      user: config.nodeMailer.FromEmail, //! owner email
      pass: config.nodeMailer.appPassword,
    },
  })

  const sentResponse = await transporter.sendMail({
    from,
    to: config.nodeMailer.FromEmail,
    subject,
    // text: 'Hello world?',
    html,
  })
  return sentResponse
}
