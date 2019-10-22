import nodemailer from 'nodemailer'
import aws from './aws'

export default new aws.SES({ apiVersion: '2010-12-01' })
