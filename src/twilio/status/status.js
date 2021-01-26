const Bull = require('bull')

const status = async (req, redis) => {

  const queue = new Bull('twilio', {
    createClient: () => redis
  })

  await queue.add('process_status', {
    body: req.body,
    sid: req.body.CallSid,
    from: req.body.From,
    to: req.body.To,
    direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
    status: req.body.CallStatus,
    sequence: req.body.SequenceNumber
  })

}

module.exports = status
