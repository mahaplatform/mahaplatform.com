const CreatePresence = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('maha_signins', (table) => {
      table.increments('id').primary()
      table.integer('account_id').unsigned()
      table.foreign('account_id').references('maha_accounts.id')
      table.integer('device_id').unsigned()
      table.foreign('device_id').references('maha_devices.id')
      table.string('code')
      table.boolean('is_active')
      table.timestamp('last_active_at')
      table.timestamps()
    })

    const sessions = await knex('maha_sessions').select(knex.raw('distinct on (user_id, device_id) *'))

    await Promise.mapSeries(sessions, async(session) => {

      const user = await knex('maha_users').where('id', session.user_id).then(r => r[0])

      await knex('maha_signins').insert({
        account_id: user.account_id,
        device_id: session.device_id,
        code: session.code,
        is_active: session.is_active,
        last_active_at: session.last_active_at,
        created_at: session.created_at,
        updated_at: session.updated_at
      })

    })

    await knex.schema.dropTable('maha_sessions')

    await knex.raw(`
      create view maha_sessions as
      select maha_signins.id as signin_id,
      maha_users.team_id,
      maha_users.id as user_id,
      maha_signins.device_id,
      maha_signins.code,
      maha_signins.is_active,
      maha_signins.last_active_at,
      maha_signins.created_at,
      maha_signins.updated_at
      from maha_signins
      inner join maha_users on maha_users.account_id=maha_signins.account_id
    `)

  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_signins')
  }

}

export default CreatePresence
