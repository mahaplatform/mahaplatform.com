import VoiceCampaignSerializer from '../../../../serializers/voice_campaign_serializer'
import VoiceCampaign from '../../../../models/voice_campaign'

const showRoute = async (req, res) => {

  const campaign = await VoiceCampaign.scope({
    team: req.team
  }).query(qb => {
    qb.where('code', req.params.id)
  }).fetch({
    withRelated: ['number','program'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  res.status(200).respond(campaign, VoiceCampaignSerializer)

}

export default showRoute
