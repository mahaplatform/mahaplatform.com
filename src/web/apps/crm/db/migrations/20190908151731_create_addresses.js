const CreateAddress = {

  up: async (knex) => {

    await knex.schema.createTable('crm_addresses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.jsonb('address')
      table.bool('is_primary')
      table.timestamps()
    })

    await knex.schema.table('crm_contacts', (table) => {
      table.jsonb('address')
    })

    await knex.schema.table('crm_consents', (table) => {
      table.integer('address_id').unsigned()
      table.foreign('address_id').references('crm_addresses.id')
    })

    await knex.schema.table('crm_subscriptions', (table) => {
      table.integer('address_id').unsigned()
      table.foreign('address_id').references('crm_addresses.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_addresses')
  }

}

export default CreateAddress
