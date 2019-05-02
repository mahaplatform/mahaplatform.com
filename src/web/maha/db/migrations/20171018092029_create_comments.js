import Migration from '../../core/objects/migration'

const CreateComments = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_comments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('commentable_type')
      table.string('commentable_id')
      table.string('uid')
      table.text('text')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_comments')
  }

})

export default CreateComments
