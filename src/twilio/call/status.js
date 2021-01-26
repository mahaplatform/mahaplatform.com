const axios = require('axios')

const getStatusHost = (env) => {
  if(env === 'production') return 'https://mahaplatform.com'
  return 'https://greg-kops-mahaplatform.ngrok.io'
}

const status = async (req, result) => {
  const host = getStatusHost(req.env)
  try {
    const result = await axios({
      url: `${host}/twilio/status`,
      method: 'post',
      data: {
        name: 'call',
        job: {
          result,
          body: req.body,
          direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
          from: req.body.From,
          to: req.body.To,
          status: req.body.Status
        }
      }
    })
  } catch(err) {
    console.log(err)
  }
}

module.exports = status
