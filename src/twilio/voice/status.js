const Bull = require('bull')

const statusQueue = new Bull('twilio', 'redis://172.31.31.51:6379/2')

const status = async (req, result) => {

  const job = await statusQueue.add('voice', {
    result,
    enrollment: req.query.enrollment,
    workflow: req.query.workflow,
    step: req.step.code,
    direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
    from: req.body.From,
    to: req.body.To,
    status: req.body.Status
  })

  console.log(job)

}

module.exports = status
