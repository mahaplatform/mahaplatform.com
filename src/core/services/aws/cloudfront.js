import aws from './aws'

const cloudfront = new aws.CloudFront({
  apiVersion: '2020-05-31'
})

export default cloudfront
