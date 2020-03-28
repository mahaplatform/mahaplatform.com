import { activity } from '../../../../../../core/services/routes/activities'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import SmsCampaign from '../../../../models/sms_campaign'
import moment from 'moment'

const destroyRoute = async (req, res) => {

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

  await sms_campaign.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: 'deleted',
    auditable: sms_campaign
  })

  await activity(req, {
    story: 'deleted {object}',
    object: sms_campaign
  })

  await socket.refresh(req, [
    `/admin/crm/campaigns/sms/${sms_campaign.get('direction')}`,
    `/admin/crm/campaigns/sms/${sms_campaign.get('id')}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
