const AddChecksToItems = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('drop view expenses_items')

    await knex.raw(`
    create or replace VIEW expenses_items AS
    select row_number() over (order by "items"."type", "items"."item_id") as id,
    "items".*
    from (
    select "expenses_advances"."id" as item_id,
    "expenses_advances"."team_id",
    'advance' as type,
    "expenses_advances"."date_needed" as date,
    "expenses_advances"."user_id" as user_id,
    "expenses_advances"."project_id",
    "expenses_advances"."expense_type_id",
    "expenses_advances"."description",
    null as "vendor_id",
    "expenses_advances"."amount",
    null as "account_id",
    "expenses_advances"."status_id",
    "expenses_advances"."batch_id",
    "expenses_advances"."created_at"
    from "expenses_advances"
    union
    select "expenses_expenses"."id" as item_id,
    "expenses_expenses"."team_id",
    'expense' as type,
    "expenses_expenses"."date",
    "expenses_expenses"."user_id" as user_id,
    "expenses_expenses"."project_id",
    "expenses_expenses"."expense_type_id",
    "expenses_expenses"."description",
    "expenses_expenses"."vendor_id",
    "expenses_expenses"."amount",
    "expenses_expenses"."account_id",
    "expenses_expenses"."status_id",
    "expenses_expenses"."batch_id",
    "expenses_expenses"."created_at"
    from "expenses_expenses"
    union
    select "expenses_trips"."id" as item_id,
    "expenses_trips"."team_id",
    'trip' as type,
    "expenses_trips"."date",
    "expenses_trips"."user_id" as user_id,
    "expenses_trips"."project_id",
    "expenses_trips"."expense_type_id",
    "expenses_trips"."description",
    null as vendor_id,
    "expenses_trips"."amount",
    null as "account_id",
    "expenses_trips"."status_id",
    "expenses_trips"."batch_id",
    "expenses_trips"."created_at"
    from "expenses_trips"
    union
    select "expenses_checks"."id" as item_id,
    "expenses_checks"."team_id",
    'check' as type,
    "expenses_checks"."date_needed" as date,
    "expenses_checks"."user_id" as user_id,
    "expenses_checks"."project_id",
    "expenses_checks"."expense_type_id",
    "expenses_checks"."description",
    "expenses_checks"."vendor_id",
    "expenses_checks"."amount",
    null as "account_id",
    "expenses_checks"."status_id",
    "expenses_checks"."batch_id",
    "expenses_checks"."created_at"
    from "expenses_checks"
    ) as "items"
    `)

  },

  down: async (knex) => {
    return await knex.raw('drop view expenses_items')
  }

}

export default AddChecksToItems
