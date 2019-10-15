import EmailCampaignSerializer from '../../../../serializers/email_campaign_serializer'
import EmailCampaign from '../../../../models/email_campaign'

const listRoute = async (req, res) => {

  const campaigns = await EmailCampaign.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['program_id']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(campaigns, EmailCampaignSerializer)

}

export default listRoute
