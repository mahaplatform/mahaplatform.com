import socket from '@core/services/routes/emitter'
import DashboardPanel from '@apps/maha/models/dashboard_panel'

const destroyRoute = async (req, res) => {

  const panel = await DashboardPanel.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('owner_id', req.user.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!panel) return res.status(404).respond({
    code: 404,
    message: 'Unable to load panel'
  })

  await req.trx('maha_dashboard_panel_accesses').where('panel_id', panel.get('id')).del()

  await panel.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/dashboard'
  ])

  await res.status(200).respond(true)

}

export default destroyRoute
