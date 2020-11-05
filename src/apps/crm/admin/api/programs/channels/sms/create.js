import socket from '@core/services/routes/emitter'
import { sendSMS } from '../../../../../../maha/services/smses'
import PhoneNumber from '../../../../../models/phone_number'
import Program from '../../../../../models/program'

const createRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.select(req.trx.raw('crm_programs.*,crm_program_user_access.type as access_type'))
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.params.program_id)
  }).fetch({
    withRelated: ['phone_number'],
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  const to = await PhoneNumber.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  const sms = await sendSMS(req, {
    user_id: req.user.get('id'),
    from: program.related('phone_number').get('number'),
    to: to.get('number'),
    body: req.body.body,
    asset_ids: req.body.asset_ids,
    queue: false
  })

  await sms.save({
    program_id: program.get('id'),
    phone_number_id: to.get('id')
  }, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${program.get('id')}/channels/sms/${to.get('id')}/smses`
  ])

  res.status(200).respond(true)

}

export default createRoute
