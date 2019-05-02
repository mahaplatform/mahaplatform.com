import { Migration } from 'maha'

const CreateCategories = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('eatfresh_categories', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('maha_assets.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('eatfresh_categories')
  }

})

export default CreateCategories
