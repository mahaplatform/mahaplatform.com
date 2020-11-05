import DashboardCardSerializer from '../../../../../serializers/dashboard_card_serializer'
import { whitelist } from '@core/services/routes/params'
import DashboardCardType from '../../../../../models/dashboard_card_type'
import socket from '@core/services/routes/emitter'
import DashboardPanel from '../../../../../models/dashboard_panel'
import DashboardCard from '../../../../../models/dashboard_card'

const createRoute = async (req, res) => {

  const panel = await DashboardPanel.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('owner_id', req.user.get('id'))
    qb.where('id', req.params.panel_id)
  }).fetch({
    withRelated: ['owner','cards'],
    transacting: req.trx
  })

  if(!panel) return res.status(404).respond({
    code: 404,
    message: 'Unable to load panel'
  })

  const type = await DashboardCardType.query(qb => {
    qb.where('code', req.body.type)
  }).fetch({
    transacting: req.trx
  })

  const card = await DashboardCard.forge({
    team_id: req.team.get('id'),
    panel_id: panel.get('id'),
    type_id: type.get('id'),
    delta: panel.related('cards').length,
    config: {},
    ...whitelist(req.body, ['title','config'])
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/dashboard'
  ])

  res.status(200).respond(card, DashboardCardSerializer)

}

export default createRoute
