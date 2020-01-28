import ResponseSerializer from '../../../../serializers/response_serializer'
import Response from '../../../../models/response'
import Form from '../../../../models/form'

const listRoute = async (req, res) => {

  const form = await Form.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.form_id)
  }).fetch({
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const responses = await Response.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('form_id', form.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: []
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-created_at',
    sortParams: ['created_at']
  }).fetchPage({
    withRelated: ['contact.photo'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(responses, ResponseSerializer)

}

export default listRoute
