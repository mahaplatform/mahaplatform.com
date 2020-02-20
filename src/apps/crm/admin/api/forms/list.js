import FormSerializer from '../../../serializers/form_serializer'
import Form from '../../../models/form'

const listRoute = async (req, res) => {

  const forms = await Form.filterFetch({
    scope: (qb) => {
      qb.select('crm_forms.*','crm_form_responses.num_responses')
      qb.innerJoin('crm_form_responses','crm_form_responses.form_id','crm_forms.id')
      qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_forms.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
      qb.where('crm_forms.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id']
    },
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(forms, FormSerializer)

}

export default listRoute
