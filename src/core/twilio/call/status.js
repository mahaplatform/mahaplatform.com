const axios = require('axios')

const status = async (req, result) => {
  try {
    await axios({
      url: `${process.env.TWILIO_STATUS_HOST}/status`,
      method: 'post',
      data: {
        sid: req.body.CallSid,
        parent_sid: req.body.ParentCallSid,
        direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
        from: req.body.From,
        to: req.body.To,
        status: req.body.CallStatus,
        sequence: req.body.SequenceNumber,
        body: req.body,
        result
      }
    })
  } catch(err) {
    console.log(err)
  }
}

module.exports = status
