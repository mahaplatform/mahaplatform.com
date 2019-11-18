const CreateMerchant = {

  up: async (knex) => {
    await knex.schema.createTable('expenses_merchants', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.string('braintree_id')
      table.boolean('is_active')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('expenses_merchants')
  }

}

export default CreateMerchant
