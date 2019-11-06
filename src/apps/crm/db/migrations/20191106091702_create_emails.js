const CreateEmail = {

  up: async (knex) => {

    await knex.schema.dropTable('crm_maha_email_templates')

    await knex.schema.dropTable('crm_workflow_emails')

    await knex.schema.createTable('crm_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.integer('sender_id').unsigned()
      table.foreign('sender_id').references('crm_senders.id')
      table.string('title')
      table.string('code')
      table.string('subject')
      table.string('reply_to')
      table.jsonb('config')
      table.timestamps()
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_emails')
  }

}

export default CreateEmail
