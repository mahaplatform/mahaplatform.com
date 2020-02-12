import EmailResultSerializer from '../../../../serializers/email_result_serializer'
import EmailCampaign from '../../../../models/email_campaign'
import EmailResult from '../../../../models/email_result'

const performanceRoute = async (req, res) => {

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

  const result = await EmailResult.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('email_campaign_id', campaign.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(!result) return res.status(200).respond({
    sent: 877,
    delivered: 805,
    bounced: 72,
    opened: 232,
    desktop: 75,
    mobile: 157,
    complained: 1,
    clicked: 53,
    unsubscribed: 2
  })

  res.status(200).respond(result, EmailResultSerializer)

}

export default performanceRoute
