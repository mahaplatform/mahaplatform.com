const CreateLabel = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('labels', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('labels')
  }

}

export default CreateLabel
