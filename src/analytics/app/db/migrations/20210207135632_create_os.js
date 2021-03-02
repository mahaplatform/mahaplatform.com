const CreateO = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('oses', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('oses')
  }

}

export default CreateO
