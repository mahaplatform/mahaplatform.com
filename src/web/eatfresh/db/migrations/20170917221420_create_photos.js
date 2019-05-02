import { Migration } from 'maha'

const CreatePhotos = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('eatfresh_photos', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.integer('attraction_id').unsigned()
      table.foreign('attraction_id').references('eatfresh_attractions.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('eatfresh_photos')
  }

})

export default CreatePhotos
