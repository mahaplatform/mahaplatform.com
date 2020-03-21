const CreateRegistration = {

  up: async (knex) => {
    await knex.schema.createTable('events_registrations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('event_id').unsigned()
      table.foreign('event_id').references('events_events.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('invoice_id').unsigned()
      table.foreign('invoice_id').references('finance_invoices.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('events_registrations')
  }

}

export default CreateRegistration
