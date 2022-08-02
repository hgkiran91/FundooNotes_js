import dotenv from 'dotenv';
dotenv.config();

const nodemailer = require('nodemailer')
const { google } = require('googleapis')


const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET =process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

export async function mailSenderRabbitMQ(email){
    try{
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'oAuth2',
                user: "kirang9897@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: "kirang9897@gmail.com",
            to: email,
            subject: "User Created Successfully",
            html: 'hello'
        }

        const result = await transport.sendMail(mailOptions)
        return result
    }
    catch(error){
        return error
    }
}