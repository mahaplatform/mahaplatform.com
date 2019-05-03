import Migration from '../../../../core/objects/migration'

const CreateEmailTemplates = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_email_templates', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('maha_apps.id')
      table.string('code')
      table.string('name')
      table.string('subject')
      table.text('html')
      table.text('text')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_email_templates')
  }

})

export default CreateEmailTemplates
