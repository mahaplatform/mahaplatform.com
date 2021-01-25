const axios = require('axios')

const getConfigPath = (req) => {
  const { query, body } = req
  const workflow = query.workflow
  const direction = body.Direction
  const from = body.From
  const to = body.To
  if(direction === 'inbound') {
    return `inbound/${to.substr(1)}`
  }
  if(direction === 'outbound-api') {
    if(workflow !== undefined) {
      return `outbound/${workflow}`
    }
  }
}

const fetchConfig = async (req) => {
  try {
    const response = await axios({
      url: `https://assets.mahaplatform.com/twiml/voice/${getConfigPath(req)}`,
      responseType: 'json'
    })
    return response.data
  } catch(err) {
    return null
  }
}

module.exports = fetchConfig
