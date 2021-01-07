const AddLockout = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_users', (table) => {
      table.boolean('is_blocked').defaultTo(false)
      table.timestamp('locked_out_at')
    })

    await knex.schema.table('maha_sessions', (table) => {
      table.boolean('is_active').defaultTo(false)
    })

  },

  down: async (knex) => {}

}

export default AddLockout
