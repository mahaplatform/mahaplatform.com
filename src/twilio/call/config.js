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
  const result = await axios({
    url: `https://assets.mahaplatform.com/twiml/${getConfigPath(req)}`,
    responseType: 'json'
  })
  return result.data
}

exports.fetchConfig = fetchConfig
