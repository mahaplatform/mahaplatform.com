import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import FaxSerializer from '../../../serializers/fax_serializer'
import PhoneNumber from '../../../../maha/models/phone_number'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { sendFax } from '../../../../maha/services/faxes'

const createRoute = async (req, res) => {

  const from = await PhoneNumber.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.body.from_number_id)
  }).fetch({
    transacting: req.trx
  })

  if(!from) return res.status(404).respond({
    code: 404,
    message: 'Unable to load number'
  })

  const to = parsePhoneNumberFromString(req.body.to, 'US')

  const fax = await sendFax(req, {
    from: from.get('number'),
    to: to.number,
    asset_id: req.body.asset_id
  })

  await activity(req, {
    story: 'created {object}',
    object: fax
  })

  await socket.refresh(req, [
    '/admin/fax/faxes/outgoing',
    '/admin/team/faxes'
  ])

  res.status(200).respond(fax, FaxSerializer)

}

export default createRoute
