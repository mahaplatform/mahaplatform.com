import FormSerializer from '../../../serializers/form_serializer'
import Form from '../../../models/form'

const showRoute = async (req, res) => {

  const form = await Form.scope(qb => {
    qb.select('crm_forms.*','crm_form_responses.num_responses')
    qb.innerJoin('crm_form_responses','crm_form_responses.form_id','crm_forms.id')
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['email'],
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  res.status(200).respond(form, FormSerializer)

}

export default showRoute
