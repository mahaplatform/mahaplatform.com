import VoiceCampaignSerializer from '../../../../serializers/voice_campaign_serializer'
import VoiceCampaign from '../../../../models/voice_campaign'

const showRoute = async (req, res) => {

  const campaign = await VoiceCampaign.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['phone_number','program'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  res.status(200).respond(campaign, VoiceCampaignSerializer)

}

export default showRoute
