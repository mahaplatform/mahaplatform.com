const CreateMemberTypes = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('expenses_member_types', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.text('description')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_member_types')
  }

}

export default CreateMemberTypes
