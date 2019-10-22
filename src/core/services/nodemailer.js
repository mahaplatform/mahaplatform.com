import nodemailer from 'nodemailer'
import ses from './ses'

export default nodemailer.createTransport({ SES: ses })
