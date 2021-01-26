const axios = require('axios')

const getStatusHost = (env) => {
  if(env === 'production') return 'https://mahaplatform.com'
  return 'https://greg-kops-mahaplatform.ngrok.io'
}

const status = async (req, result) => {
  const host = getStatusHost(req.env)
  try {
    await axios({
      url: `${host}/twilio/status`,
      method: 'post',
      data: {
        body: req.body,
        sid: req.body.CallSid,
        parent_sid: req.body.ParentCallSid,
        from: req.body.From,
        to: req.body.To,
        direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
        status: req.body.CallStatus,
        sequence: req.body.SequenceNumber
      }
    })
  } catch(err) {
    console.log(err)
  }
}

module.exports = status
