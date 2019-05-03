import Migration from '../../../../../core/objects/migration'

const CreateSites = new Migration({

  up: async (knex) => {

    await knex.schema.createTable('sites_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('site_id').unsigned()
      table.foreign('site_id').references('sites_sites.id')
      table.string('code')
      table.string('subject')
      table.text('text')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('sites_emails')
  }

})

export default CreateSites
