const Bull = require('bull')

const status = async (req, result, redis) => {

  const queue = new Bull('twilio', {
    createClient: () => redis
  })

  console.log(queue)

  await queue.add('process_voice_status', {
    result,
    enrollment: req.query.enrollment,
    workflow: req.query.workflow,
    step: req.step.code,
    direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
    answered_by: req.body.AnsweredBy,
    sid: req.body.CallSid,
    from: req.body.From,
    to: req.body.To,
    status: req.body.CallStatus,
    sequence: req.body.SequenceNumber
  })

}

module.exports = status
