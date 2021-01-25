const status = async (req, result, queue) => {
  await queue.add('process_voice_status', {
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
