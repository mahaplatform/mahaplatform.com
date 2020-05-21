const CreateChannelView = {

  up: async (knex) => {

    await knex.schema.createTable('crm_channel_views', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('email_address_id').unsigned()
      table.foreign('email_address_id').references('crm_email_addresses.id')
      table.integer('phone_number_id').unsigned()
      table.foreign('phone_number_id').references('crm_phone_numbers.id')
      table.string('type')
      table.timestamp('last_viewed_at')
      table.timestamps()
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_channel_views')
  }

}

export default CreateChannelView
