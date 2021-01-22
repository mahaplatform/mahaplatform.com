const CreateEmailId = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.table('sessions', (table) => {
      table.integer('email_id')
    })

  },

  down: async (knex) => {
  }

}

export default CreateEmailId
