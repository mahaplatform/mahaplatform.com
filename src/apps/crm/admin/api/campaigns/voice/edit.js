import VoiceCampaign from '../../../../models/voice_campaign'

const editRoute = async (req, res) => {

  const voice_campaign = await VoiceCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!voice_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  res.status(200).respond(voice_campaign, (req, campaign) => ({
    title: campaign.get('title'),
    purpose: campaign.get('purpose'),
    to: campaign.get('to')
  }))

}

export default editRoute
