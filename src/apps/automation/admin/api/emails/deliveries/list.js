import EmailDeliverySerializer from '@apps/automation/serializers/email_delivery_serializer'
import CrmEmail from '@apps/automation/models/email'
import Email from '@apps/maha/models/email'

const listRoute = async (req, res) => {

  const email = await CrmEmail.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.email_id)
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
  })

  const emails = await Email.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('email_id', email.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['was_delivered','was_bounced','was_opened','is_mobile','was_clicked','was_complained','was_unsubscribed']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['-created_at']
    },
    page: req.query.$page,
    withRelated: ['contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(emails, EmailDeliverySerializer)

}

export default listRoute
