const axios = require('axios')

const getStatusHost = (env) => {
  if(env === 'production') return 'https://mahaplatform.com'
  return 'https://greg-kops-mahaplatform.ngrok.io'
}

const status = async (req, result) => {
  const host = getStatusHost(req.env)
  try {
    await axios({
      url: `${host}/twilio/call`,
      method: 'post',
      data: {
        sid: req.body.CallSid,
        parent_sid: req.body.ParentCallSid,
        direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
        from: req.body.From,
        to: req.body.To,
        status: req.body.Status,
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
