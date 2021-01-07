const CreateSubscription = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('crm_subscriptions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('list_id').unsigned()
      table.foreign('list_id').references('crm_lists.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.timestamp('unsubscribed_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_subscriptions')
  }

}

export default CreateSubscription
