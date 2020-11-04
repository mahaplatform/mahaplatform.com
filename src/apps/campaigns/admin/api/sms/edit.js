import SmsCampaign from '../../../models/sms_campaign'

const editRoute = async (req, res) => {

  const sms_campaign = await SmsCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!sms_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  res.status(200).respond(sms_campaign, (req, campaign) => ({
    title: campaign.get('title'),
    term: campaign.get('term'),
    purpose: campaign.get('purpose'),
    to: campaign.get('to')
  }))

}

export default editRoute
