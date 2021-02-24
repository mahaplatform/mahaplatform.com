const CreateCampaign = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('campaigns', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('campaigns')
  }

}

export default CreateCampaign
