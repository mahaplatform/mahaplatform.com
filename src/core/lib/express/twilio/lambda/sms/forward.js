const axios = require('axios')

const status = async (req) => {
  try {
    await axios({
      url: `${process.env.TWILIO_HOST_STATUS}/sms/receive`,
      method: 'post',
      data: req.body,
    })
  } catch(err) {
    console.log(err)
  }
}

module.exports = status
