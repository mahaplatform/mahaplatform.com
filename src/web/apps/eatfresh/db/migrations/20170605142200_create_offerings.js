import Migration from '../../../../core/objects/migration'

const CreateOfferings = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('eatfresh_offerings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('maha_assets.id')
      table.string('slug')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('eatfresh_offerings')
  }

})

export default CreateOfferings
