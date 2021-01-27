const axios = require('axios')

const status = async (req, result) => {
  try {
    await axios({
      url: `${process.env.TWILIO_STATUS_HOST}/status`,
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
