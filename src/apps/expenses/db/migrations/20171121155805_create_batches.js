import { Migration } from 'maha'
import moment from 'moment'

const CreateBatches = new Migration({

  up: async (knex) => {

    await knex.schema.createTable('expenses_batches', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('integration')
      table.integer('items_count')
      table.timestamps()
    })

    const user = await knex('maha_users').where({ id: 64 })

    if(user[0]) {
      await knex('expenses_batches').insert([
        { team_id: 1, user_id: 64, created_at: moment('2017-11-24 11:29').utc() }
      ])
    }

    const tables = ['advances','expenses','trips']

    await Promise.mapSeries(tables, async table => {

      await knex.schema.table(`expenses_${table}`, (table) => {
        table.integer('batch_id').unsigned()
        table.foreign('batch_id').references('expenses_batches.id')
      })

      if(user[0]) {
        return await knex(`expenses_${table}`).where({ status_id: 6 }).update({ batch_id: 1 })
      }

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
    ) as "items"
    `)

  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_batches')
  }

})

export default CreateBatches
