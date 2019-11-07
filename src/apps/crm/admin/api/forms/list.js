import FormSerializer from '../../../serializers/form_serializer'
import Form from '../../../models/form'

const listRoute = async (req, res) => {

  const forms = await Form.scope(qb => {
    qb.joinRaw('inner join crm_program_user_access on crm_program_user_access.program_id=crm_forms.program_id and crm_program_user_access.user_id=?', req.user.get('id'))
    qb.where('crm_forms.team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['program_id']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(forms, FormSerializer)

}

export default listRoute
