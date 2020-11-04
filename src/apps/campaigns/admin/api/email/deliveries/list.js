import EmailDeliverySerializer from '../../../../../automation/serializers/email_delivery_serializer'
import EmailCampaign from '../../../../models/email_campaign'
import Email from '../../../../../maha/models/email'

const deliveriesRoute = async (req, res) => {

  const campaign = await EmailCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const emails = await Email.filterFetch({
    scope: (qb) => {
      qb.innerJoin('crm_contacts','crm_contacts.id','maha_emails.contact_id')
      qb.where('maha_emails.team_id', req.team.get('id'))
      qb.where('maha_emails.email_campaign_id', campaign.get('id'))
    },
    aliases: {
      first_name: 'crm_contacts.first_name',
      last_name: 'crm_contacts.last_name'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['was_delivered','was_bounced','was_opened','is_mobile','was_clicked','was_complained','was_unsubscribed'],
      search: ['first_name','last_name']
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

export default deliveriesRoute
