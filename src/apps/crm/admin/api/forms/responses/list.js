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

  const fields = form.get('config').fields

  const responses = await Response.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('form_id', form.get('id'))
  }).filter({
    aliases: {
      ...fields.reduce((aliases, field) => ({
        ...aliases,
        [field.name]: `data->>'${field.name}'`
      }), {})
    },
    filter: req.query.$filter,
    filterParams: [
      ...fields.map(field => field.name)
    ]
  }).sort({
    aliases: {
      ...fields.reduce((aliases, field) => ({
        ...aliases,
        [field.name]: `data->>'${field.name}'`
      }), {})
    },
    sort: req.query.$sort,
    defaultSort: '-created_at',
    sortParams: [
      ...fields.map(field => field.name),
      'created_at'
    ]
  }).fetchPage({
    withRelated: ['contact.photo'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(responses, ResponseSerializer)

}

export default listRoute
