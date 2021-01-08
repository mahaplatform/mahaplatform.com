import Campaign from '@apps/analytics/models/campaign'

export const getCampaign = async(req, data) => {

  const campaign = await Campaign.query(qb => {
    qb.where('text', data.mkt_campaign)
  }).fetch({
    transacting: req.trx
  })

  if(campaign) return campaign

  return await Campaign.forge({
    text: data.mkt_campaign
  }).save(null, {
    transacting: req.trx
  })

}
