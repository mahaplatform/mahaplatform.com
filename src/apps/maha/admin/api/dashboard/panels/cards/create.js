import DashboardCardSerializer from '../../../../../serializers/dashboard_card_serializer'
import { whitelist } from '../../../../../../../core/services/routes/params'
import socket from '../../../../../../../core/services/routes/emitter'
import DashboardPanel from '../../../../../models/dashboard_panel'
import DashboardCard from '../../../../../models/dashboard_card'

const createRoute = async (req, res) => {

  const panel = await DashboardPanel.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('owner_id', req.user.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['owner','cards'],
    transacting: req.trx
  })

  if(!panel) return res.status(404).respond({
    code: 404,
    message: 'Unable to load panel'
  })

  const card = await DashboardCard.forge({
    team_id: req.team.get('id'),
    panel_id: panel.get('id'),
    ...whitelist(req.body, ['type','config'])
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/dashboard/panels/${panel.get('id')}`
  ])

  res.status(200).respond(card, DashboardCardSerializer)

}

export default createRoute
