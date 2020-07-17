const adminSummaryRoute = async (req, res) => {

  const team_id = req.team.get('id')

  const admin_summary_counts = await req.trx.raw(`
    select * from finance_admin_summary
    where team_id=${team_id}
  `)

  res.status(200).respond(admin_summary_counts.rows[0])
}

export default adminSummaryRoute
