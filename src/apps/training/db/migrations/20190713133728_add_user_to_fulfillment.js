const AddUserToFulfillment = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('training_fulfillments', (table) => {
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddUserToFulfillment
