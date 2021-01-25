const axios = require('axios')

const status = async (req, result) => {

  const response = await axios({
    url: 'https://twiml.mahaplatform.com/status',
    method: 'post',
    data: {
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
    }
  })

  return response.data

}

module.exports = status
