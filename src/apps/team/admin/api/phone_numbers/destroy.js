import { activity } from '../../../../../core/services/routes/activities'
import twilio from '../../../../../core/services/twilio'
import socket from '../../../../../core/services/routes/emitter'
import PhoneNumber from '../../../../maha/models/phone_number'

const destroyRoute = async (req, res) => {

  const phone_number = await PhoneNumber.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!phone_number) return res.status(404).respond({
    code: 404,
    message: 'Unable to load phone number'
  })

  await twilio.incomingPhoneNumbers(phone_number.get('sid')).remove()

  await phone_number.destroy()

  await activity(req, {
    story: 'released {object}',
    object: phone_number
  })

  await socket.refresh(req, [
    '/admin/team/phone_numbers'
  ])

  res.status(200).respond(true)

}

export default destroyRoute
