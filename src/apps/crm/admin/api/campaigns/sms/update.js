import SMSCampaignSerializer from '../../../../serializers/sms_campaign_serializer'
import { whitelist } from '../../../../../../core/services/routes/params'
import SMSCampaign from '../../../../models/sms_campaign'

const updateRoute = async (req, res) => {

  const campaign = await SMSCampaign.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
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

  res.status(200).respond(campaign, SMSCampaignSerializer)

}

export default updateRoute
