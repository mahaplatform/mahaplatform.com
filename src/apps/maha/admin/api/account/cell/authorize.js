import { parsePhoneNumberFromString } from 'libphonenumber-js'
import client from '../../../../../../core/services/twilio'
import redis from '../../../../../../core/services/redis'

const authorizeRoute = async (req, res) => {

  const code = Math.floor(100000 + Math.random() * 900000)

  await client.messages.create({
    body: `Your cell phone verification code is: ${code}`,
    from: process.env.TWILIO_NUMBER,
    to: req.body.cell_phone
  })

  const cell_phone = parsePhoneNumberFromString(req.body.cell_phone, 'US')

  const data = JSON.stringify({
    cell_phone: cell_phone.number,
    code
  })

  await redis.setAsync(`verification:${req.user.get('id')}`, data, 'EX', 60 * 5)

  res.status(200).respond(true)

}

export default authorizeRoute
