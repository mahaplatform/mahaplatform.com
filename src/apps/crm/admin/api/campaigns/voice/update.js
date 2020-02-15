import VoiceCampaignSerializer from '../../../../serializers/voice_campaign_serializer'
import { whitelist } from '../../../../../../core/services/routes/params'
import VoiceCampaign from '../../../../models/voice_campaign'

const updateRoute = async (req, res) => {

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

  await campaign.save({
    ...whitelist(req.body, ['title','steps'])
  }, {
    patch: true,
    transacting: req.trx
  })

  res.status(200).respond(campaign, VoiceCampaignSerializer)

}

export default updateRoute
