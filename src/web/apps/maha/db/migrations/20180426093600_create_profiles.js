const CreateProfiles = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_profiles', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('profile_type_id').unsigned()
      table.foreign('profile_type_id').references('maha_profile_types.id')
      table.jsonb('data')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_profiles')
  }

}

export default CreateProfiles
