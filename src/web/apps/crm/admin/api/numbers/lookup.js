import twilio from '../../../../../core/services/twilio'

const lookupRoute = async (req, res) => {

  const { areacode, latitude, longitude } = req.query

  const numbers  = await twilio.availablePhoneNumbers('US').local.list({
    mmsEnabled: true,
    smsEnabled: true,
    voiceEnabled: true,
    areaCode: areacode,
    nearLatLong: [latitude,longitude].join(','),
    distance: 50,
    limit: 20
  })

  res.status(200).respond(numbers.sort((a,b) => {
    return a.locality > b.locality ? 1 : -1
  }))

}

export default lookupRoute
