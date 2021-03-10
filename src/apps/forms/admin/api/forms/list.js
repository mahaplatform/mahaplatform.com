import FormSerializer from '@apps/forms/serializers/form_serializer'
import Form from '@apps/forms/models/form'

const listRoute = async (req, res) => {

  const forms = await Form.filterFetch({
    scope: (qb) => {
      qb.select('crm_forms.*','crm_form_totals.*')
      qb.innerJoin('crm_form_totals','crm_form_totals.form_id','crm_forms.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=crm_forms.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_forms.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_forms.team_id', req.team.get('id'))
      qb.whereNull('deleted_at')
    },
    aliases: {
      program: 'crm_programs.title',
      respondents_count: 'crm_form_totals.respondents_count',
      responses_count: 'crm_form_totals.responses_count',
      revenue: 'crm_form_totals.revenue'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['id','title','program','title','respondents_count','responses_count','revenue']
    },
    page: req.query.$page,
    withRelated: ['program.logo'],
    transacting: req.trx
  })

  await res.status(200).respond(forms, FormSerializer)

}

export default listRoute
