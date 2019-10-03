import aws from './aws'

export default new aws.S3({
  signatureVersion: 'v4'
})
