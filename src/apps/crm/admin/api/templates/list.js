import TemplateSerializer from '@apps/crm/serializers/template_serializer'
import Template from '@apps/crm/models/template'

const listRoute = async (req, res) => {

  const templates = await Template.filterFetch({
    scope: (qb) => {
      qb.joinRaw('left join crm_program_user_access on crm_program_user_access.program_id=crm_templates.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.whereRaw('(crm_program_user_access.program_id is not null or crm_templates.team_id is null)')
      qb.whereNull('deleted_at')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['title'],
      allowed: ['title']
    },
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(templates, TemplateSerializer)

}

export default listRoute
