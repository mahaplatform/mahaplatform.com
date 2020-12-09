import aws from './aws'

const ses = new aws.SES({
  apiVersion: '2010-12-01'
})

export default ses
