import DashboardPanelSerializer from '@apps/maha/serializers/dashboard_panel_serializer'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import DashboardPanel from '@apps/maha/models/dashboard_panel'
import moment from 'moment'

const updateRoute = async (req, res) => {

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

  await panel.save({
    ...whitelist(req.body, ['config'])
  }, {
    transacting: req.trx,
    patch: true
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

  await socket.refresh(req, [
    '/admin/dashboard'
  ])

  await panel.load(['cards.type.app','owner'], {
    transacting: req.trx
  })

  await res.status(200).respond(panel, DashboardPanelSerializer)

}

export default updateRoute
