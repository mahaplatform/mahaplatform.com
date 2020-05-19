import { twiml } from 'twilio'

const makeHook = async (req, { call, phone_number }) => {

  const response = new twiml.VoiceResponse()

  const dial = response.dial({
    callerId: call.related('from').get('number')
  })

  dial.number(call.related('to').get('number'))

  console.log(response.toString())

  return response.toString()

}

export default makeHook
