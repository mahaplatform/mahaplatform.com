const axios = require('axios')

const status = async (req, result) => {

  const response = await axios({
    url: 'https://twiml.mahaplatform.com/status',
    method: 'post',
    data: {
      type: 'voice',
      result,
      enrollment: req.query.enrollment,
      workflow: req.query.workflow,
      step: req.step.code,
      direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
      from: req.body.From,
      to: req.body.To,
      status: req.body.Status
    }
  })

  return response.data

}

module.exports = status
