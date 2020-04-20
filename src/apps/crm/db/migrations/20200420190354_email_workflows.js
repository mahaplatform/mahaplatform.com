const EmailWorkflows = {

  up: async (knex) => {
    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('maha_emails.id')
    })
  },

  down: async (knex) => {
  }

}

export default EmailWorkflows
