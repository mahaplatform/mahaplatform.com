const Bull = require('bull')

const statusQueue = new Bull('voice_status', process.env.REDIS_URL)

const status = async (req, result) => {

  await statusQueue.add({
    type: 'voice',
    result,
    enrollment: req.query.enrollment,
    workflow: req.query.workflow,
    step: req.step.code,
    direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
    from: req.body.From,
    to: req.body.To,
    status: req.body.Status
  })

}

module.exports = status
