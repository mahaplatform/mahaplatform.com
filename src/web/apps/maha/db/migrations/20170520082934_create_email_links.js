import Migration from '../../../../core/objects/migration'

const CreateEmailLinks = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_email_links', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('maha_emails.id')
      table.string('code')
      table.string('text')
      table.string('url')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_email_links')
  }

})

export default CreateEmailLinks
