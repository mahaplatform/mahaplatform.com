require('./env')
const Response = require('./response')
const Request = require('./request')
const aws = require('./aws')

exports.handler = async (event, context) => {

  if(!process.env.TWILIO_HOST_TWIML) {
    await new Promise(resolve => {
      setTimeout(resolve, 500)
    })
  }
  
  const req = new Request(event)

  const res = new Response()

  const s3 = new aws.S3()

  const recording = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: req.query.key
  }).promise()

  res.addHeader('Cache-Control', 'immutable,max-age=100000000,public')

  res.status(200).type(recording.ContentType).send(recording.Body)

  return res.render()

}
