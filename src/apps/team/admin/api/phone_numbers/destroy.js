import { activity } from '@core/services/routes/activities'
import twilio from '@core/vendor/twilio'
import socket from '@core/services/routes/emitter'
import PhoneNumber from '@apps/maha/models/phone_number'

const destroyRoute = async (req, res) => {

  const phone_number = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!phone_number) return res.status(404).respond({
    code: 404,
    message: 'Unable to load phone number'
  })

  await twilio.incomingPhoneNumbers(phone_number.get('sid')).remove()

  await phone_number.save({
    is_active: false
  }, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'released {object}',
    object: phone_number
  })

  await socket.refresh(req, [
    '/admin/team/phone_numbers'
  ])

  await res.status(200).respond(true)

}

export default destroyRoute
