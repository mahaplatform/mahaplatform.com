const axios = require('axios')

const status = async (req, result) => {
  try {
    await axios({
      url: `${process.env.TWILIO_STATUS_HOST}/status`,
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
