import Twilio from 'twilio'
const { AccessToken } = Twilio.jwt
const { VoiceGrant } = AccessToken

const tokenRoute = async (req, res) => {

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

  token.identity = `user-${req.user.get('id')}`

  res.status(200).respond(token.toJwt())

}

export default tokenRoute
