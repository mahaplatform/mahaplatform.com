const TeamSoftDelete = {

  up: async (knex) => {
    await knex.schema.table('maha_teams', (table) => {
      table.timestamp('deleted_at')
    })
  },

  down: async (knex) => {
  }

}

export default TeamSoftDelete
