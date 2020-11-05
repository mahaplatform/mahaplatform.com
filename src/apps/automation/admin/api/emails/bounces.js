import EmailDeliverySerializer from '@apps/automation/serializers/email_delivery_serializer'
import CRMEmail from '@apps/automation/models/email'
import Email from '@apps/maha/models/email'

const bouncesRoute = async (req, res) => {

  const crm_email = await CRMEmail.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!crm_email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  const emails = await Email.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('email_id', crm_email.get('id'))
      qb.where('was_bounced', true)
    },
    filter: {
      params: req.query.$filter,
      allowed: ['bounce_type']
    },
    sort: {
      params: req.params.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(emails, EmailDeliverySerializer)

}

export default bouncesRoute
