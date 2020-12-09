import ResponseSerializer from '@apps/forms/serializers/response_serializer'
import Response from '@apps/forms/models/response'
import Form from '@apps/forms/models/form'

const showRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.form_id)
  }).fetch({
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const response = await Response.query(qb => {
    qb.select('forms_responses.*','crm_response_totals.*')
    qb.innerJoin('crm_response_totals','crm_response_totals.response_id','forms_responses.id')
    qb.where('forms_responses.team_id', req.team.get('id'))
    qb.where('forms_responses.form_id', form.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['contact.photo','enrollment','form'],
    transacting: req.trx
  })

  res.status(200).respond(response, ResponseSerializer)

}

export default showRoute
