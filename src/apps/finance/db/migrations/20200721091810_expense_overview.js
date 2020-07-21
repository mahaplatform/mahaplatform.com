const ExpenseStatView = {

  up: async (knex) => {
    await knex.raw(`
      create view finance_expense_overview as
      with submitted as (
        select count(*), user_id
        from finance_items
        where status in ('submitted')
        and deleted_at is null
        group by user_id
      ),
      saved as (
        select count(*), user_id
        from finance_items
        where status in ('incomplete','pending')
        and deleted_at is null
        group by user_id
      ),
      rejected as (
        select count(*), user_id
        from finance_items
        where status in ('rejected')
        and deleted_at is null
        group by user_id
      )
      select maha_users.id as user_id,
      coalesce(submitted.count, 0) as submitted_count,
      coalesce(saved.count, 0) as saved_count,
      coalesce(rejected.count, 0) as rejected_count
      from maha_users
      left join saved on maha_users.id=saved.user_id
      left join rejected on maha_users.id=rejected.user_id
      left join submitted on maha_users.id=submitted.user_id
    `)
  },

  down: async (knex) => {
  }

}

export default ExpenseStatView
