import { Migration } from 'maha'

const CreateLikes = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_likes', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('likeable_type')
      table.integer('likeable_id')
      table.timestamp('unliked_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_likes')
  }

})

export default CreateLikes
