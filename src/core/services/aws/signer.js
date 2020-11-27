import aws from './aws'

export default new aws.CloudFront.Signer(process.env.AWS_CLOUDFRONT_ACCESS_KEY_ID, process.env.AWS_CLOUDFRONT_PRIVATE_KEY)
