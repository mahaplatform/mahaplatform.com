const CreateMembers = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('sites_members', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('site_id').unsigned()
      table.foreign('site_id').references('sites_sites.id')
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('password_salt')
      table.string('password_hash')
      table.jsonb('values')
      table.boolean('is_active')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('sites_members')
  }

}

export default CreateMembers
