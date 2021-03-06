import DashboardPanel from '@apps/maha/models/dashboard_panel'

const editRoute = async (req, res) => {

  const panel = await DashboardPanel.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('owner_id', req.user.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['accesses'],
    transacting: req.trx
  })

  if(!panel) return res.status(404).respond({
    code: 404,
    message: 'Unable to load panel'
  })

  await res.status(200).respond(panel, (req, panel) => ({
    id: panel.get('id'),
    title: panel.get('title'),
    accesses: panel.related('accesses').map(access => ({
      id: access.get('id'),
      grouping_id: access.get('grouping_id'),
      group_id: access.get('group_id'),
      user_id: access.get('user_id')
    }))
  }))

}

export default editRoute
