const moment = require('moment')
const aws = require('./aws')

const status = async (req, result) => {
  try {
    const sns = new aws.SNS()
    await sns.publish({
      TopicArn: process.env.TWILIO_SNS_VOICE,
      Message: JSON.stringify({
        ...req.body,
        Timestamp: moment().format('ddd, DD MMM YYYY HH:mm:ss.SSSZ'),
        Result: result
      })
    }).promise()
  } catch(err) {
    console.log(err)
  }
}

module.exports = status
