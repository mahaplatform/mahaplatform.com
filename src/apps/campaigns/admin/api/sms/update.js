import SmsCampaignSerializer from '../../../serializers/sms_campaign_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { updateSteps } from '../../../../automation/services/workflows'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import SmsCampaign from '../../../models/sms_campaign'

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
      ...whitelist(req.body, ['to','title','purpose','term'])
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

  await audit(req, {
    story: 'updated',
    auditable: sms_campaign
  })

  await activity(req, {
    story: 'updated {object}',
    object: sms_campaign
  })

  await socket.refresh(req, [
    `/admin/campaigns/sms/${sms_campaign.get('direction')}`,
    `/admin/campaigns/sms/${sms_campaign.get('id')}`
  ])

  res.status(200).respond(sms_campaign, SmsCampaignSerializer)

}

export default updateRoute
