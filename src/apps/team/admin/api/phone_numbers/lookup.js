import twilio from '@core/vendor/twilio'

const lookupRoute = async (req, res) => {

  const numbers  = await twilio.availablePhoneNumbers('US').local.list({
    mmsEnabled: true,
    smsEnabled: true,
    voiceEnabled: true,
    areaCode: req.query.areacode,
    distance: 50,
    limit: 20
  })

  await res.status(200).respond(numbers.sort((a,b) => {
    return a.locality > b.locality ? 1 : -1
  }))

}

export default lookupRoute
