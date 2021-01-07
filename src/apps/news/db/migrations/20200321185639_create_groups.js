const CreateGroup = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('news_groups', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('owner_id').unsigned()
      table.foreign('owner_id').references('maha_users.id')
      table.integer('logo_id').unsigned()
      table.foreign('logo_id').references('maha_assets.id')
      table.string('title')
      table.timestamps()
    })

    await knex.schema.table('news_posts', (table) => {
      table.dropColumn('type')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('news_groups.id')
    })

    await knex.schema.dropTable('news_accesses')

  },

  down: async (knex) => {
    await knex.schema.dropTable('news_groups')
  }

}

export default CreateGroup
