const UpdateForm = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_forms', (table) => {
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('crm_emails.id')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateForm
