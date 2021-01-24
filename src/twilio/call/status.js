const axios = require('axios')

const status = async (call, execution, step) => {

  const { req } = call

  const response = await axios({
    url: 'https://twiml.mahaplatform.com/status',
    method: 'post',
    data: {
      result: execution.result,
      enrollment: req.query.enrollment,
      workflow: req.query.workflow,
      step: step.code,
      direction: req.body.Direction === 'inbound' ? 'inbound' : 'outbound',
      from: req.body.From,
      to: req.body.To,
      status: req.body.Status
    }
  })

  return response.data

}

exports.status = status
