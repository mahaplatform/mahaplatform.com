import { activity } from '../../../../../../core/services/routes/activities'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import PostalCampaign from '../../../../models/postal_campaign'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const postal_campaign = await PostalCampaign.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!postal_campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  await postal_campaign.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: 'deleted',
    auditable: postal_campaign
  })

  await activity(req, {
    story: 'deleted {object}',
    object: postal_campaign
  })

  await socket.refresh(req, [
    '/admin/crm/campaigns/postal',
    `/admin/crm/campaigns/postal/${postal_campaign.get('id')}`
  ])

  res.status(200).respond(true)

}

export default destroyRoute
