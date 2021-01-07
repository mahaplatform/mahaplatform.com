const CreateAccounts = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('expenses_accounts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('name')
      table.boolean('is_active').defaultTo(false)
      table.jsonb('integration')
      table.timestamps()
    })

    await knex('expenses_accounts').insert([
      { name: 'Visa', integration: { vendor_id: 'VELAN' } },
      { name: 'WordPro', integration: { vendor_id: 'VWORD' } },
      { name: 'Wegmans', integration: { vendor_id: 'VWEGM' } }
    ])

    await knex.schema.table('expenses_expenses', (table) => {
      table.integer('account_id').unsigned()
      table.foreign('account_id').references('expenses_accounts.id')
    })

    const expenses = await knex('expenses_expenses').where({ is_visa: true })

    await Promise.mapSeries(expenses, async (expense) => {
      return await knex('expenses_expenses').update({ account_id: 1 })
    })

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
    "expenses_advances"."vendor_id",
    "expenses_advances"."amount",
    null as "account_id",
    "expenses_advances"."status_id",
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
    "expenses_trips"."created_at"
    from "expenses_trips"
    ) as "items"
    `)

    await knex.schema.table('expenses_expenses', (table) => {
      table.dropColumn('is_visa')
    })
  },

  down: async (knex) => {

    await knex.schema.table('expenses_expenses', (table) => {
      table.dropColumn('account_id')
    })

    await knex.schema.dropTable('expenses_accounts')

  }

}

export default CreateAccounts
