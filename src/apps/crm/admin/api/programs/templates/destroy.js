import { activity } from '../../../../../../core/services/routes/activities'
import socket from '../../../../../../core/services/routes/emitter'
import { checkProgramAccess } from '../../../../services/programs'
import Template from '../../../../models/template'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const template = await Template.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_templates.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_templates.program_id', req.params.program_id)
    qb.where('crm_templates.team_id', req.team.get('id'))
    qb.where('crm_templates.id', req.params.id)
    qb.whereNull('crm_templates.deleted_at')
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  await template.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'deleted {object}',
    object: template
  })

  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}`,
    `/admin/crm/programs/${req.params.program_id}/templates/${req.params.id}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
