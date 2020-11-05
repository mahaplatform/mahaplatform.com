import { activity } from '@core/services/routes/activities'
import ProgramSerializer from '../../../serializers/program_serializer'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Program from '../../../models/program'

const updateRoute = async (req, res) => {

  const program = await Program.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_programs.id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_programs.team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  await program.save({
    ...whitelist(req.body, ['logo_id','title','phone_number_id','address','bank_id'])
  }, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'updated',
    auditable: program
  })

  await activity(req, {
    story: 'updated {object}',
    object: program
  })

  await socket.refresh(req, [
    '/admin/crm/programs',
    `/admin/crm/programs/${program.get('id')}`
  ])

  res.status(200).respond(program, ProgramSerializer)

}

export default updateRoute
