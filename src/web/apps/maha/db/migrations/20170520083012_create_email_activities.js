import Migration from '../../../../core/objects/migration'

const CreateEmailActivities = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_email_activities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('maha_emails.id')
      table.integer('email_link_id').unsigned()
      table.foreign('email_link_id').references('maha_email_links.id')
      table.string('type')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_email_activities')
  }

})

export default CreateEmailActivities
