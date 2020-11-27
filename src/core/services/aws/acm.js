import aws from './aws'

const acm = new aws.ACM({
  apiVersion: '2015-12-08'
})

export default acm
