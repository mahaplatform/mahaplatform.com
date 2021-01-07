const CreateFeature = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_features', (table) => {
      table.increments('id').primary()
      table.string('title')
    })
    await knex.schema.createTable('maha_accounts_features', (table) => {
      table.integer('account_id').unsigned()
      table.foreign('account_id').references('maha_accounts.id')
      table.integer('feature_id').unsigned()
      table.foreign('feature_id').references('maha_features.id')

    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_accounts_features')
    await knex.schema.dropTable('maha_features')
  }

}

export default CreateFeature
