const axios = require('axios')

const status = async (req) => {
  try {
    await axios({
      url: `${process.env.TWILIO_STATUS_HOST}/sms/receive`,
      method: 'post',
      data: req.body,
    })
  } catch(err) {
    console.log(err)
  }
}

module.exports = status
