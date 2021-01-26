const axios = require('axios')

const getStatusHost = (env) => {
  if(env === 'production') return 'https://mahaplatform.com'
  return 'https://greg-kops-mahaplatform.ngrok.io'
}

const status = async (req, result) => {
  const host = getStatusHost(req.env)
  try {
    await axios({
      url: `${host}/twilio/voice`,
      method: 'post',
      data: {
        result,
        enrollment: req.query.enrollment,
        workflow: req.query.workflow,
        step: req.step.code,
        direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
        answered_by: req.body.AnsweredBy,
        sid: req.body.CallSid,
        from: req.body.From,
        to: req.body.To,
        status: req.body.CallStatus,
        sequence: req.body.SequenceNumber
      }
    })
  } catch(err) {
    console.log(err)
  }
}

module.exports = status
