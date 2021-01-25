const Bull = require('bull')

const statusQueue = new Bull('voice_status', process.env.REDIS_URL)

const status = async (req, result) => {

  await statusQueue.add({
    type: 'sms',
    result,
    enrollment: req.session.enrollment,
    workflow: req.session.workflow,
    term: req.session.term,
    step: req.step.code,
    from: req.body.From,
    to: req.body.To,
    status: req.body.Status,
    message: req.body.Body
  })

}

module.exports = status
