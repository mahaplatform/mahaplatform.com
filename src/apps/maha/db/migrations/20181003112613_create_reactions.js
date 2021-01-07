const CreateReactions = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('maha_reactions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('reactable_type')
      table.integer('reactable_id')
      table.enum('type', ['thumbsup','thumbsdown','smile','cry','rage','heart'])
      table.timestamp('unreacted_at')
      table.timestamps()
    })

    const likes = await knex('maha_likes')

    await knex('maha_reactions').insert(likes.map(like => ({
      team_id: like.team_id,
      user_id: like.user_id,
      reactable_type: like.likeable_type,
      reactable_id: like.likeable_id,
      type: 'thumbsup',
      unreacted_at: like.unliked_at,
      created_at: like.created_at,
      updated_at: like.updated_at
    })))

    return await knex.schema.dropTable('maha_likes')

  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_reactions')
  }

}

export default CreateReactions
