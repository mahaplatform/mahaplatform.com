import ResponseSerializer from '../../../../serializers/response_serializer'
import Response from '../../../../models/response'
import Form from '../../../../models/form'

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
    qb.select('crm_responses.*','crm_response_totals.*')
    qb.innerJoin('crm_response_totals','crm_response_totals.response_id','crm_responses.id')
    qb.where('crm_responses.team_id', req.team.get('id'))
    qb.where('crm_responses.form_id', form.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['contact.photo','enrollment'],
    transacting: req.trx
  })

  res.status(200).respond(response, ResponseSerializer)

}

export default showRoute
