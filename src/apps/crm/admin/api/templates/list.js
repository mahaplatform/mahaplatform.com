import TemplateSerializer from '../../../serializers/template_serializer'
import Template from '../../../models/template'

const listRoute = async (req, res) => {

  const templates = await Template.filterFetch({
    scope: (qb) => {
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_templates.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_templates.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id']
    },
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(templates, TemplateSerializer)

}

export default listRoute
