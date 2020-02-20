import ResponseSerializer from '../../../../serializers/response_serializer'
import Response from '../../../../models/response'
import Form from '../../../../models/form'

const listRoute = async (req, res) => {

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

  const responses = await Response.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('form_id', form.get('id'))
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(responses, ResponseSerializer)

}

export default listRoute
