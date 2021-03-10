import TemplateSerializer from '@apps/crm/serializers/template_serializer'
import { checkProgramAccess } from '@apps/crm/services/programs'
import Template from '@apps/crm/models/template'

const showRoute = async (req, res) => {

  const access = await checkProgramAccess(req, {
    program_id: req.params.program_id,
    types: ['manage','edit','view']
  })

  if(!access) return res.status(403).respond({
    code: 403,
    message: 'You dont have sufficient access to perform this action'
  })

  const template = await Template.query(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_templates.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_templates.team_id', req.team.get('id'))
    qb.where('crm_templates.program_id', req.params.program_id)
    qb.where('crm_templates.id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  await res.status(200).respond(template, TemplateSerializer)

}

export default showRoute
