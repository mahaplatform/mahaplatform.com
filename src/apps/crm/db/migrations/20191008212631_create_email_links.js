const CreateEmailLink = {

  up: async (knex) => {
    await knex.schema.createTable('crm_email_links', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('emailable_type')
      table.integer('emailable_id')
      table.string('code')
      table.string('text')
      table.string('url')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_email_links')
  }

}

export default CreateEmailLink
