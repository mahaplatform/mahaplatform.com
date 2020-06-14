import DashboardPanelSerializer from '../../../../serializers/dashboard_panel_serializer'
import { whitelist } from '../../../../../../core/services/routes/params'
import socket from '../../../../../../core/services/routes/emitter'
import DashboardPanel from '../../../../models/dashboard_panel'
import moment from 'moment'

const createRoute = async (req, res) => {

  const panel = await DashboardPanel.forge({
    team_id: req.team.get('id'),
    owner_id: req.user.get('id'),
    ...whitelist(req.body, ['title','config'])
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.accesses) {
    await Promise.map(req.body.accesses, async access => {
      await req.trx('maha_dashboard_panel_accesses').insert({
        team_id: req.team.get('id'),
        panel_id: panel.get('id'),
        grouping_id: access.grouping_id,
        group_id: access.group_id,
        user_id: access.user_id,
        created_at: moment(),
        updated_at: moment()
      })
    })
  }

  await panel.load(['cards.type.app','owner'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/dashboard'
  ])

  res.status(200).respond(panel, DashboardPanelSerializer)

}

export default createRoute
