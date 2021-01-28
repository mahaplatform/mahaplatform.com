import Twilio from 'twilio'
const { AccessToken } = Twilio.jwt
const { VoiceGrant } = AccessToken

const getToken = async (req) => {

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: process.env.TWILIO_APP_SID,
    incomingAllow: true
  })

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  )

  token.addGrant(voiceGrant)

  token.identity = `${req.user.get('id')}`

  return token.toJwt()

}

export default getToken
