const CreateMailingAddress = {

  up: async (knex) => {

    await knex.schema.createTable('crm_mailing_addresses', (table) => {
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
      table.integer('mailing_address_id').unsigned()
      table.foreign('mailing_address_id').references('crm_mailing_addresses.id')
    })

    await knex.schema.table('crm_subscriptions', (table) => {
      table.integer('mailing_address_id').unsigned()
      table.foreign('mailing_address_id').references('crm_mailing_addresses.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_mailing_addresses')
  }

}

export default CreateMailingAddress
