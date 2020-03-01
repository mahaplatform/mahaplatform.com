const CreateWorkflowEnrollment = {

  up: async (knex) => {
    await knex.schema.table('crm_workflows', (table) => {
      table.dropColumn('topic_id')
      table.dropColumn('list_id')
      table.dropColumn('config')
    })
    await knex.schema.createTable('crm_workflow_enrollments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('response_id').unsigned()
      table.foreign('response_id').references('crm_responses.id')
      table.string('code')
      table.boolean('was_completed')
      table.boolean('was_converted')
      table.timestamp('unenrolled_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_workflow_enrollments')
  }

}

export default CreateWorkflowEnrollment
