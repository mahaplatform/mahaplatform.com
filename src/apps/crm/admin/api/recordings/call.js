import client from '../../../../../core/services/twilio'
import redis from '../../../../../core/services/redis'
import _ from 'lodash'

const callRoute = async (req, res) => {

  const code = _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)

  const data = JSON.stringify({
    team_id: req.team.get('id'),
    user_id: req.user.get('id')
  })

  await redis.setAsync(`recording:${code}`, data, 'EX', 60 * 5)

  await client.calls.create({
    method: 'get',
    url: `${process.env.TWIML_HOST}/api/admin/crm/recordings/${code}`,
    from: process.env.TWILIO_NUMBER,
    to: req.body.number
  })

  res.status(200).respond({ code })

}

export default callRoute
