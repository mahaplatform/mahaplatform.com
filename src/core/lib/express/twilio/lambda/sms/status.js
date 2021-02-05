const aws = require('./aws')

const status = async (req, result) => {
  try {
    const sns = new aws.SNS()
    const result = await sns.publish({
      TopicArn: process.env.TWILIO_SNS_SMS,
      Message: JSON.stringify({
        ...req.body,
        Meta: {
          enrollment: req.session.enrollment,
          workflow: req.session.workflow,
          term: req.session.term,
          step: req.step.code
        },
        Result: result
      })
    }).promise()
  } catch(err) {
    console.log(err)
  }
}

module.exports = status
