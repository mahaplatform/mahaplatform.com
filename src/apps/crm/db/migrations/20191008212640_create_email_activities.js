const CreateEmailActivity = {

  up: async (knex) => {
    await knex.schema.createTable('crm_email_activities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('crm_emails.id')
      table.integer('email_link_id').unsigned()
      table.foreign('email_link_id').references('crm_email_links.id')
      table.enum('type', ['open','click'], { useNative: true, enumName: 'crm_email_activities_type' })
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_email_activities')
  }

}

export default CreateEmailActivity
