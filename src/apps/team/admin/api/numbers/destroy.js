import { activity } from '../../../../../core/services/routes/activities'
import twilio from '../../../../../core/services/twilio'
import socket from '../../../../../core/services/routes/emitter'
import Number from '../../../../maha/models/number'

const destroyRoute = async (req, res) => {

  const number = await Number.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!number) return res.status(404).respond({
    code: 404,
    message: 'Unable to load number'
  })

  await twilio.incomingPhoneNumbers(number.get('sid')).remove()

  await number.destroy()

  await activity(req, {
    story: 'released {object}',
    object: number
  })

  await socket.refresh(req, [
    '/api/admin/team/numbers'
  ])

  res.status(200).respond(true)

}

export default destroyRoute
