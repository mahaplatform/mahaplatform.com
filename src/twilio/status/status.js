const status = async (req, queue) => {
  await queue.add('process_status', {
    sid: req.body.CallSid,
    from: req.body.From,
    to: req.body.To,
    direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
    status: req.body.CallStatus,
    sequence: req.body.SequenceNumber
  })
}

module.exports = status
