import EmailCampaign from '../../../../models/email_campaign'

const editRoute = async (req, res) => {

  const email_campaign = await EmailCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!email_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  res.status(200).respond(email_campaign, (req, campaign) => ({
    title: campaign.get('title'),
    purpose: campaign.get('purpose'),
    to: campaign.get('to').criteria
  }))

}

export default editRoute
