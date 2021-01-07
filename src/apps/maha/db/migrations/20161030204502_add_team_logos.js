const AddTeamLogos = {

  databaseName: 'maha',

  up: async (knex) => {

    const client = knex.client.config.client

    return await knex.schema.table('maha_teams', (table) => {
      table.integer('logo_id').unsigned()
      if(client !== 'sqlite3') table.foreign('logo_id').references('maha_assets.id')
    })

  },

  down: async (knex) => {

    return await knex.schema.table('maha_teams', (table) => {
      table.dropColumn('logo_id')
    })

  }

}

export default AddTeamLogos
