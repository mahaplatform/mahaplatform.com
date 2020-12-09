import FormSerializer from '@apps/forms/serializers/form_serializer'
import Form from '@apps/forms/models/form'

const listRoute = async (req, res) => {

  const forms = await Form.filterFetch({
    scope: (qb) => {
      qb.select('forms_forms.*','forms_form_totals.*')
      qb.innerJoin('forms_form_totals','forms_form_totals.form_id','forms_forms.id')
      qb.joinRaw('inner join crm_programs on crm_programs.id=forms_forms.program_id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=forms_forms.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('forms_forms.team_id', req.team.get('id'))
      qb.whereNull('deleted_at')
    },
    aliases: {
      program: 'crm_programs.title',
      respondents_count: 'forms_form_totals.respondents_count',
      responses_count: 'forms_form_totals.responses_count',
      revenue: 'forms_form_totals.revenue'
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

  res.status(200).respond(forms, FormSerializer)

}

export default listRoute
