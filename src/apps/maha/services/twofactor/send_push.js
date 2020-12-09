import { parsePhoneNumberFromString } from 'libphonenumber-js'
import client from '@core/vendor/twilio'
import redis from '@core/vendor/redis'

const sendPush = async (req, { account, cell_phone }) => {

  const code = Math.floor(100000 + Math.random() * 900000)

  await client.messages.create({
    body: `Your cell phone verification code is: ${code}`,
    from: process.env.TWILIO_NUMBER,
    to: cell_phone
  })

  const parsed = parsePhoneNumberFromString(cell_phone, 'US')

  const data = JSON.stringify({
    cell_phone: parsed.number,
    code
  })

  await redis.setAsync(`verification:${req.account.get('id')}`, data, 'EX', 60 * 5)

}

export default sendPush
