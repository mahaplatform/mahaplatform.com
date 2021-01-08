const CreateMedium = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('mediums', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('mediums')
  }

}

export default CreateMedium
