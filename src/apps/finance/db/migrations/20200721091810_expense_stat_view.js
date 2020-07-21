const ExpenseStatView = {

  up: async (knex) => {
    await knex.raw(`
      create view finance_expense_overview as
      with approvals as (
        select count(*), team_id, user_id
        from finance_items
        where status in ('submitted')
        and deleted_at is null
        group by user_id
      ),
      submitted as (
        select count(*), team_id, user_id
        from finance_items
        where status in ('submitted')
        and deleted_at is null
        group by user_id
      ),
      saved as (
        select count(*), team_id, user_id
        from finance_items
        where status in ('incomplete','')
        and deleted_at is null
        group by user_id
      ),
      select maha_teams.id as team_id,
      coalesce(approvals.count, 0) as approvals_count,
      coalesce(submitted.count, 0) as submitted_count
      coalesce(saved.count, 0) as saved_count
      from maha_teams
      TODO left join on user_id
    `)
  },

  down: async (knex) => {
  }

}

export default ExpenseStatView
