import Migration from '../../../../core/objects/migration'

const CreateReviews = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_reviews', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('reviewable_type')
      table.string('reviewable_id')
      table.string('uid')
      table.integer('score')
      table.text('text')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_reviews')
  }

})

export default CreateReviews
