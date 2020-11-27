import nodemailer from 'nodemailer'
import ses from './aws/ses'

export default nodemailer.createTransport({ SES: ses })
