import SmsCampaignSerializer from '../../../../serializers/sms_campaign_serializer'
import { whitelist } from '../../../../../../core/services/routes/params'
import SmsCampaign from '../../../../models/sms_campaign'
import { updateSteps } from '../../../../services/workflows'

const updateRoute = async (req, res) => {

  const sms_campaign = await SmsCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['phone_number','program'],
    transacting: req.trx
  })

  if(!sms_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  if(req.body.title) {
    await sms_campaign.save({
      ...whitelist(req.body, ['to','title'])
    }, {
      patch: true,
      transacting: req.trx
    })
  }

  if(req.body.steps) {
    await updateSteps(req, {
      sms_campaign,
      steps: req.body.steps
    })
  }

  res.status(200).respond(sms_campaign, SmsCampaignSerializer)

}

export default updateRoute
