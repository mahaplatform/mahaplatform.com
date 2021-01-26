const axios = require('axios')

const getStatusHost = (env) => {
  if(env === 'production') return 'https://mahaplatform.com'
  return 'https://greg-kops-mahaplatform.ngrok.io'
}

const status = async (req, result) => {
  const host = getStatusHost(req.env)
  try {
    await axios({
      url: `${host}/twilio/sms`,
      method: 'post',
      data: {
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
  } catch(err) {
    console.log(err)
  }
}

module.exports = status
