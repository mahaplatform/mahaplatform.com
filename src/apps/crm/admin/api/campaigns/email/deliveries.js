import EmailDeliverySerializer from '../../../../serializers/email_delivery_serializer'
import EmailCampaign from '../../../../models/email_campaign'
import Email from '../../../../../maha/models/email'

const deliveriesRoute = async (req, res) => {

  const campaign = await EmailCampaign.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const emails = await Email.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('email_campaign_id', campaign.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['was_delivered','was_bounced','was_opened','is_mobile','was_clicked','was_complained','was_unsubscribed']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(emails, EmailDeliverySerializer)

}

export default deliveriesRoute
