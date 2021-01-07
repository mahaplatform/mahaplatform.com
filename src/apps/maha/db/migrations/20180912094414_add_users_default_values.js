const AddUsersDefaultValues = {

  databaseName: 'maha',

  up: async (knex) => {

    const users = await knex('maha_users')

    await knex.schema.table('maha_users', table => {
      table.dropColumn('values')
    })

    await knex.schema.table('maha_users', table => {
      table.jsonb('values').defaultTo('{}')
    })

    await Promise.map(users, async user => {
      await knex('maha_users').where({
        id: user.id
      }).update({
        values:user.values
      })
    })

  },

  down: async (knex) => {}

}

export default AddUsersDefaultValues
