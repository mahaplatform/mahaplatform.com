const adminOverviewRoute = async (req, res) => {

  const admin_overview_counts = await req.trx('finance_admin_overview').where(qb => {
    qb.where('team_id', req.team.get('id'))
  }).then(rows => rows[0])

  await res.status(200).respond(admin_overview_counts)
}

export default adminOverviewRoute
