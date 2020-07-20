const adminSummaryRoute = async (req, res) => {

  const admin_summary_counts = await req.trx('finance_admin_summary').where(qb => {
    qb.where('team_id', req.team.get('id'))
  }).then(rows => rows[0])

  res.status(200).respond(admin_summary_counts)
}

export default adminSummaryRoute
