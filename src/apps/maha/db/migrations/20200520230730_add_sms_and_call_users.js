const AddSmsAndCallUsers = {

  up: async (knex) => {

    await knex.schema.table('maha_calls', (table) => {
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
    })

    await knex.schema.table('maha_smses', (table) => {
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
    })

  },

  down: async (knex) => {
  }

}

export default AddSmsAndCallUsers
