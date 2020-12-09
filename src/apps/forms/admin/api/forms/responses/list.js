import ResponseSerializer from '@apps/forms/serializers/response_serializer'
import Response from '@apps/forms/models/response'
import Form from '@apps/forms/models/form'

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

  req.fields = form.get('config').fields

  const responses = await Response.filterFetch({
    scope: (qb) => {
      qb.select('forms_responses.*','crm_response_totals.*')
      qb.innerJoin('crm_response_totals','crm_response_totals.response_id','forms_responses.id')
      qb.innerJoin('crm_contacts','crm_contacts.id','forms_responses.contact_id')
      qb.where('forms_responses.team_id', req.team.get('id'))
      qb.where('forms_responses.form_id', form.get('id'))
    },
    aliases: {
      first_name: 'crm_contacts.first_name',
      last_name: 'crm_contacts.last_name',
      contact: 'crm_contacts.last_name',
      revenue: 'crm_response_totals.revenue',
      ...form.get('config').fields.reduce((aliases, field) => ({
        ...aliases,
        [field.code]: `forms_responses.data->>'${field.code}'`
      }), {})
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
    withRelated: ['contact.photo','payment'],
    transacting: req.trx
  })

  res.status(200).respond(responses, ResponseSerializer)

}

export default listRoute
