import EmailCampaignResultSerializer from '../../../../serializers/email_campaign_result_serializer'
import EmailCampaignResult from '../../../../models/email_campaign_result'
import EmailCampaign from '../../../../models/email_campaign'

const performanceRoute = async (req, res) => {

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

  const result = await EmailCampaignResult.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', campaign.get('id'))
  }).fetch({
    transacting: req.trx
  })

  res.status(200).respond(result, EmailCampaignResultSerializer)

}

export default performanceRoute
