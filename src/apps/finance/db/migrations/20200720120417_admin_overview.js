const AdminOverview = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw(`
      create view finance_admin_overview as
      with physical_payments as (
        select count(*), team_id
        from finance_payments
        where status in ('received')
        and method in ('cash', 'check')
        group by team_id
      ),
      digital_payments_captured as (
        select count(*), team_id
        from finance_payments
        where status in ('captured')
        and method in ('ach','card','paypal','applepay','googlepay')
        group by team_id
      ),
      digital_payments_settled as (
        select count(*), team_id
        from finance_payments
        where status in ('settled')
        and method in ('ach','card','paypal','applepay','googlepay')
        group by team_id
      ),
      deposits as (
        select count(*), team_id
        from finance_deposits
        where status in ('pending')
        group by team_id
      ),
      expenses_approved as (
        select count(*), team_id
        from finance_items
        where deleted_at is null
        and status in ('approved')
        group by team_id
      ),
      expenses_reviewed as (
        select count(*), team_id
        from finance_items
        where deleted_at is null
        and status in ('reviewed')
        group by team_id
      )
      select maha_teams.id as team_id,
      coalesce(physical_payments.count, 0) as physical_payments_count,
      coalesce(digital_payments_captured.count, 0) as digital_payments_captured_count,
      coalesce(digital_payments_settled.count, 0) as digital_payments_settled_count,
      coalesce(deposits.count, 0) as deposits_count,
      coalesce(expenses_approved.count, 0) as expenses_approved_count,
      coalesce(expenses_reviewed.count, 0) as expenses_reviewed_count
      from maha_teams
      left join physical_payments on maha_teams.id=physical_payments.team_id
      left join digital_payments_captured on maha_teams.id=digital_payments_captured.team_id
      left join digital_payments_settled on maha_teams.id=digital_payments_settled.team_id
      left join deposits on maha_teams.id=deposits.team_id
      left join expenses_approved on maha_teams.id=expenses_approved.team_id
      left join expenses_reviewed on maha_teams.id=expenses_reviewed.team_id
    `)
  },

  down: async (knex) => {
  }

}

export default AdminOverview
