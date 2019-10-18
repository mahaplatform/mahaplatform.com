const ConvertSubscriptions = {

  up: async (knex) => {

    await knex.schema.dropTable('crm_subscriptions')

    await knex.schema.createTable('crm_subscriptions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('list_id').unsigned()
      table.foreign('list_id').references('crm_lists.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.timestamps()
    })

  },

  down: async (knex) => {
  }

}

export default ConvertSubscriptions
