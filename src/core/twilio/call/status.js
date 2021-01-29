const axios = require('axios')

const status = async (req, result) => {
  try {
    await axios({
      url: `${process.env.TWILIO_STATUS_HOST}/twilio/status`,
      method: 'post',
      data: {
        ...req.body,
        Result: result
      }
    })
  } catch(err) {
    console.log(err)
  }
}

module.exports = status
