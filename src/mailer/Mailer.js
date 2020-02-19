import nodemailer from 'nodemailer'

class Mailer {

  async init() {

    let testAccount = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS
      }
    });
  }

  async sendMail(userMail) {
    let transporter = await this.init();

    return await transporter.sendMail({
      from: 'Ann Trepachko <tr.ann@outlook.com>',
      to: userMail,
      subject: 'Delete Account',
      text: 'Your account deleted'
    })
  }

}

export default new Mailer();