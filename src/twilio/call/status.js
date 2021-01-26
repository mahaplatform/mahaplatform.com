const Bull = require('bull')

const status = async (req, result, redis) => {

  const queue = new Bull('twilio', {
    createClient: () => redis
  })

  await queue.add('call', {
    result,
    body: req.body,
    direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
    from: req.body.From,
    to: req.body.To,
    status: req.body.Status
  })

}

module.exports = status
