import aws from './aws'

const s3 = new aws.S3({
  signatureVersion: 'v4'
})

export default s3
