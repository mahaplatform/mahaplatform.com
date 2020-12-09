import aws from './aws'

const route53 = new aws.Route53({
  apiVersion: '2013-04-01'
})

export default route53
