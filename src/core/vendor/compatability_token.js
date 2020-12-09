import Twilio from 'twilio'

const { ClientCapability } = Twilio.jwt

const capability = new ClientCapability({
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN
})

capability.addScope(new ClientCapability.OutgoingClientScope({
  applicationSid: process.env.TWILIO_APP_SID
}))

export default capability
