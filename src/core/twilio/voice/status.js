const axios = require('axios')

const status = async (req, result) => {
  try {
    await axios({
      url: `${process.env.TWILIO_STATUS_HOST}/status`,
      method: 'post',
      data: {
        ...req.body,
        Meta: {
          enrollment: req.query.enrollment,
          workflow: req.query.workflow,
          step: req.step.code
        },
        Result: result
      }
    })
  } catch(err) {
    console.log(err)
  }
}

module.exports = status
