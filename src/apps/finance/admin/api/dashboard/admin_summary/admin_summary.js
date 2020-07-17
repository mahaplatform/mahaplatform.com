const adminSummaryRoute = async (req, res) => {

  const team_id = req.team.get('id')

  const admin_summary_counts = await knex.raw(`
    with physical_payments as (
      select count(*) as physical_payments_count
      from finance_payments
      where team_id=${team_id}
      and status in ('received')
      and method in ('cash', 'check')
    ),
    digital_payments_captured as (
      select count(*) as digital_payments_captured_count
      from finance_payments
      where team_id=${team_id}
      and status in ('captured')
      and method in ('ach','card','paypal','applepay','googlepay')
    ),
    digital_payments_settled as (
      select count(*) as digital_payments_settled_count
      from finance_payments
      where team_id=${team_id}
      and status in ('settled')
      and method in ('ach','card','paypal','applepay','googlepay')
    ),
    deposits as (
      select count(*) as deposits_count
      from finance_deposits
      where team_id=${team_id}
      and status in ('pending')
    ),
    expenses_approved as (
      select count(*) as expenses_approved_count
      from finance_items
      where team_id=${team_id}
      and deleted_at is null
      and status in ('approved')
    ),
    expenses_reviewed as (
      select count(*) as expenses_reviewed_count
      from finance_items
      where team_id=${team_id}
      and deleted_at is null
      and status in ('reviewed')
    )
    select * from deposits
    cross join physical_payments
    cross join digital_payments_captured
    cross join digital_payments_settled
    cross join expenses_approved
    cross join expenses_reviewed
  `)

  res.status(200).respond(admin_summary_counts)
}

export default adminSummaryRoute
