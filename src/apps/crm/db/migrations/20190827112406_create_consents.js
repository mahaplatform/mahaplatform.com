const CreateConsent = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('crm_consents', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('email_address_id').unsigned()
      table.foreign('email_address_id').references('crm_email_addresses.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.string('code')
      table.timestamp('unsubscribed_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_consents')
  }

}

export default CreateConsent
