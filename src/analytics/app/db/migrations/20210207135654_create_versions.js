const CreateVersion = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('versions', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('versions')
  }

}

export default CreateVersion
