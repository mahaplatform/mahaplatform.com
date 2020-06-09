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
      qb.select('crm_responses.*','crm_response_totals.*')
      qb.innerJoin('crm_response_totals','crm_response_totals.response_id','crm_responses.id')
      qb.innerJoin('crm_contacts','crm_contacts.id','crm_responses.contact_id')
      qb.where('crm_responses.team_id', req.team.get('id'))
      qb.where('crm_responses.form_id', form.get('id'))
    },
    aliases: {
      first_name: 'crm_contacts.first_name',
      last_name: 'crm_contacts.last_name',
      contact: 'crm_contacts.last_name',
      revenue: 'crm_response_totals.revenue'
    },
    filter: {
      params: req.query.$filter,
      search: ['first_name','last_name']
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
