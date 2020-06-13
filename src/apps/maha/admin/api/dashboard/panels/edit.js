import DashboardPanel from '../../../../models/dashboard_panel'

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

  res.status(200).respond(panel, (req, panel) => ({
    id: panel.get('id'),
    title: panel.get('title'),
    accesses: panel.related('accesses').map(access => ({
      id: req.team.get('id'),
      grouping_id: access.grouping_id,
      group_id: access.group_id,
      user_id: access.user_id
    }))
  }))

}

export default editRoute
