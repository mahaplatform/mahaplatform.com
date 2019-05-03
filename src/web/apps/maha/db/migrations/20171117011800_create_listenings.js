import Migration from '../../../../core/objects/migration'

const CreateListenings = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_listenings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('listenable_type')
      table.string('listenable_id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.timestamp('unsubscribed_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_listenings')
  }

})

export default CreateListenings
