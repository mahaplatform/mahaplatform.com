import DashboardPanelSerializer from '@apps/maha/serializers/dashboard_panel_serializer'
import DashboardPanel from '@apps/maha/models/dashboard_panel'

const listRoute = async (req, res) => {

  const panels = await DashboardPanel.filterFetch({
    scope: (qb) => {
      qb.leftJoin('maha_dashboard_panel_accesses','maha_dashboard_panel_accesses.panel_id','maha_dashboard_panels.id')
      qb.leftJoin('maha_users_groups','maha_users_groups.group_id','maha_dashboard_panel_accesses.group_id')
      qb.joinRaw('left join maha_groupings_users on maha_groupings_users.grouping_id=maha_dashboard_panel_accesses.grouping_id and maha_groupings_users.team_id=maha_dashboard_panel_accesses.team_id')
      qb.whereRaw('(maha_dashboard_panels.team_id is null or maha_dashboard_panels.team_id=?)', req.team.get('id'))
      qb.whereRaw('(maha_groupings_users.user_id=? or maha_dashboard_panels.owner_id=? or maha_dashboard_panel_accesses.user_id=? or maha_users_groups.user_id=?)', [req.user.get('id'),req.user.get('id'),req.user.get('id'),req.user.get('id')])
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    page: req.query.$page,
    withRelated: ['cards.type.app','owner'],
    transacting: req.trx
  })

  await res.status(200).respond(panels, DashboardPanelSerializer)

}

export default listRoute
