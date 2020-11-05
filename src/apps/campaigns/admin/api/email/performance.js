import EmailCampaignResultSerializer from '@apps/campaigns/serializers/email_campaign_result_serializer'
import EmailCampaign from '@apps/campaigns/models/email_campaign'

const performanceRoute = async (req, res) => {

  const campaign = await EmailCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['results'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  res.status(200).respond(campaign.related('results'), EmailCampaignResultSerializer)

}

export default performanceRoute
