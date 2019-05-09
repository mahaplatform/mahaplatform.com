import Migration from '../../../../core/objects/migration'

const CreateAttractions = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('eatfresh_attractions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.string('slug')
      table.text('description')
      table.integer('county_id').unsigned()
      table.foreign('county_id').references('eatfresh_counties.id')
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('maha_assets.id')
      table.string('address_1')
      table.string('address_2')
      table.string('city')
      table.string('state')
      table.string('zip')
      table.string('phone')
      table.string('hours_of_operation')
      table.boolean('is_free_range')
      table.boolean('is_vegetarian')
      table.boolean('is_organic')
      table.boolean('is_accessible')
      table.boolean('is_family_friendly')
      table.boolean('is_senior')
      table.boolean('is_military')
      table.boolean('is_family_owned')
      table.string('website')
      table.string('facebook')
      table.boolean('is_approved')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('eatfresh_attractions')
  }

})

export default CreateAttractions
