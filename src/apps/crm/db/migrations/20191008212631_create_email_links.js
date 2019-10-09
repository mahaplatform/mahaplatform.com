const CreateEmailLink = {

  up: async (knex) => {
    await knex.schema.createTable('crm_email_links', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('crm_emails.id')
      table.string('code', 255)
      table.string('text', 255)
      table.string('url', 255)
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_email_links')
  }

}

export default CreateEmailLink
