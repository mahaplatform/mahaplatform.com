const axios = require('axios')

const status = async (thread, execution, step) => {

  const { req } = thread

  const response = await axios({
    url: 'https://twiml.mahaplatform.com/status',
    method: 'post',
    data: {
      result: execution.result,
      enrollment: req.query.enrollment,
      workflow: req.query.workflow,
      step: step.code,
      from: req.body.From,
      to: req.body.To,
      status: req.body.Status
    }
  })

  return response.data

}

exports.status = status
