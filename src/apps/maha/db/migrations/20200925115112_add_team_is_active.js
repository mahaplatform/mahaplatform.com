const AddTeamIsActive = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_teams', table => {
      table.boolean('is_active')
    })

    await knex('maha_teams').update('is_active', true)

  },

  down: async (knex) => {
  }

}

export default AddTeamIsActive
