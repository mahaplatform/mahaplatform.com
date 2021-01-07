const CreateAssignees = {

  databaseName: 'maha',

  up: async (knex) => {

    return await knex.schema.createTable('maha_device_values', (table) => {
      table.increments('id').primary()
      table.string('type')
      table.string('text')
    })

  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_device_values')
  }

}

export default CreateAssignees
