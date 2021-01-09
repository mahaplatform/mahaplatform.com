const CreateAction = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('actions', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('actions')
  }

}

export default CreateAction
