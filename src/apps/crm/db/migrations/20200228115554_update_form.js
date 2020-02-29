const UpdateForm = {

  up: async (knex) => {
    await knex.schema.table('crm_forms', (table) => {
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('crm_emails.id')
    })
    await knex('crm_forms').where('id',1).update({
      workflow_id: 1,
      email_id: 1
    })
  },

  down: async (knex) => {
  }

}

export default UpdateForm
