const AddEventWorkflow = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_workflows', (table) => {
      table.integer('event_id').unsigned()
      table.foreign('event_id').references('events_events.id')
    })

    await knex.schema.table('crm_emails', (table) => {
      table.integer('event_id').unsigned()
      table.foreign('event_id').references('events_events.id')
    })

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.integer('registration_id').unsigned()
      table.foreign('registration_id').references('events_registrations.id')
    })

    await knex.schema.table('events_events', (table) => {
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('crm_emails.id')
    })

  },

  down: async (knex) => {
  }

}

export default AddEventWorkflow
