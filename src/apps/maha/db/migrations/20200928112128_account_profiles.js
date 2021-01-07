const AccountProfiles = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_profiles', table => {
      table.integer('account_id').unsigned()
      table.foreign('account_id').references('maha_accounts.id')
    })

    await knex('maha_profiles').where('team_id', 11).delete()

    const profiles = await knex('maha_profiles')
      .select('maha_profiles.*','maha_users.account_id')
      .innerJoin('maha_users','maha_users.id','maha_profiles.user_id')

    await Promise.mapSeries(profiles, async profile => {
      await knex('maha_profiles')
        .where('id', profile.id)
        .update('account_id', profile.account_id)
    })

    await knex.schema.table('maha_profiles', table => {
      table.dropColumn('team_id')
      table.dropColumn('user_id')
    })

  },

  down: async (knex) => {
  }

}

export default AccountProfiles
