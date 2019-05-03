import Migration from '../../../../core/objects/migration'

const CreateActivities = new Migration({

  up: async (knex) => {
    await knex.schema.createTable('maha_teams', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('subdomain')
      table.string('color')
      table.text('email_template')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_teams')
  }

})

export default CreateActivities
