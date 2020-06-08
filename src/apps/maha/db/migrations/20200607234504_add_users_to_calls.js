const AddUsersToCalls = {

  up: async (knex) => {

    await knex.schema.table('maha_calls', (table) => {
      table.integer('from_user_id').unsigned()
      table.foreign('from_user_id').references('maha_users.id')
      table.integer('to_user_id').unsigned()
      table.foreign('to_user_id').references('maha_users.id')
    })

  },

  down: async (knex) => {
  }

}

export default AddUsersToCalls
