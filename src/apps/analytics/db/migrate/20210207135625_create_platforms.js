const CreatePlatform = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.createTable('platforms', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('platforms')
  }

}

export default CreatePlatform
