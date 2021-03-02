const CreateDevice = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('devices', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('devices')
  }

}

export default CreateDevice
