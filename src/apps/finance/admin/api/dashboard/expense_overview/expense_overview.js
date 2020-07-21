const expenseOverviewRoute = async (req, res) => {

  const expense_overview_counts = await req.trx('finance_expense_overview').where(qb => {
    qb.where('user_id', req.user.get('id'))
    qb.where('team_id', req.team.get('id'))
  }).then(rows => rows[0])

  res.status(200).respond(expense_overview_counts)
}

export default expenseOverviewRoute
