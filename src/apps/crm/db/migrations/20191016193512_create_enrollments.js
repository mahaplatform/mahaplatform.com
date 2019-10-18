const CreateEnrollment = {

  up: async (knex) => {
    await knex.schema.createTable('crm_enrollments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.string('code')
      table.specificType('actions', 'jsonb[]')
      table.boolean('was_converted')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_enrollments')
  }

}

export default CreateEnrollment
