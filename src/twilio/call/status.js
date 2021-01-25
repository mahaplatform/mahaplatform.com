const status = async (req, result, queue) => {
  await queue.add('process_voice_status', {
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
