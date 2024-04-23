require("dotenv").config()
const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const { MailerSend, Sender } = require("mailersend");

const mailerSend = new MailerSend({
  apiKey: process.env.API_KEY,
});

async function sendEmailLink({ email, token }){
    const sentFrom = new Sender(process.env.FROM_EMAIL, "Email Verification");
    const recipients = [new Recipient(email, "Client verification")];
    await mailerSend.email.send(new EmailParams().setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("This is a Subject")
        .setHtml(`<strong>This is the HTML content: <a href=http://localhost:5000/verify?${token}></a></strong>`)
        .setText("Please use this login link to login."))
}

module.exports = sendEmailLink 