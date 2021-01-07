const UpdateAuthentication = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_teams', (table) => {
      table.enum('authentication_strategy', ['local','cornell','google','ldap'], { useNative: true, enumName: 'maha_teams_authentication_strategy' })
      table.jsonb('authentication_config')
    })

    await knex('maha_teams').update({
      authentication_strategy: 'local',
      authentication_config: {}
    })

    await knex.schema.dropTable('maha_strategies')

  },

  down: async (knex) => {
  }

}

export default UpdateAuthentication
