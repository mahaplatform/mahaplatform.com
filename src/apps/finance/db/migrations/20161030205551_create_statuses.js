const CreateStatuses = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('expenses_statuses', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_statuses')
  }

}

export default CreateStatuses
