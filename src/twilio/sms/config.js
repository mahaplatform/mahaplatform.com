const axios = require('axios')

const getConfigPath = (req) => {
  const { body } = req
  const message = body.Body
  const from = body.From
  const to = body.To
  return `${to.substr(1)}/${message.toLowerCase()}`
}

const fetchConfig = async (req) => {
  try {
    const response = await axios({
      url: `https://assets.mahaplatform.com/twiml/sms/${getConfigPath(req)}`,
      responseType: 'json'
    })
    return response.data
  } catch(err) {
    return null
  }
}

exports.fetchConfig = fetchConfig
