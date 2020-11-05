import DashboardCardSerializer from '@apps/maha/serializers/dashboard_card_serializer'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import DashboardPanel from '@apps/maha/models/dashboard_panel'
import DashboardCard from '@apps/maha/models/dashboard_card'

const updateRoute = async (req, res) => {

  const panel = await DashboardPanel.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('owner_id', req.user.get('id'))
    qb.where('id', req.params.panel_id)
  }).fetch({
    transacting: req.trx
  })

  if(!panel) return res.status(404).respond({
    code: 404,
    message: 'Unable to load panel'
  })

  const card = await DashboardCard.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('panel_id', panel.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!card) return res.status(404).respond({
    code: 404,
    message: 'Unable to load card'
  })

  await card.save({
    ...whitelist(req.body, ['title','config'])
  }, {
    transacting: req.trx,
    patch: true
  })

  await socket.refresh(req, [
    '/admin/dashboard'
  ])

  res.status(200).respond(card, DashboardCardSerializer)

}

export default updateRoute
