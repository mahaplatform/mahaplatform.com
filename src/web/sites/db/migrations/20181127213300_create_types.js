import { Migration } from 'maha'

const CreateTypes = new Migration({

  up: async (knex) => {

    await knex.schema.createTable('sites_types', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('site_id').unsigned()
      table.foreign('site_id').references('sites_sites.id')
      table.string('title')
      table.string('name')
      table.text('description')
      table.boolean('requires_approval')
      table.boolean('has_public_submission')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('sites_types')
  }

})

export default CreateTypes
