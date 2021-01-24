const axios = require('axios')

const getConfigPath = (query, body) => {
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

const fetchConfig = async (query, body) => {
  const result = await axios({
    url: `https://assets.mahaplatform.com/twiml/${getConfigPath(query, body)}`,
    responseType: 'json'
  })
  return result.data
}

exports.fetchConfig = fetchConfig
