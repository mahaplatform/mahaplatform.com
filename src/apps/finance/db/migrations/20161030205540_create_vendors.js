const CreateVendors = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('expenses_vendors', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('name')
      table.string('address_1')
      table.string('address_2')
      table.string('city')
      table.string('state')
      table.string('zip')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('expenses_vendors')
  }

}

export default CreateVendors
