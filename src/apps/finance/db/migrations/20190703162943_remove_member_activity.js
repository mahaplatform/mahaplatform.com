const RemoveMemberActivity = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('expenses_members', (table) => {
      table.dropColumn('is_active')
    })

    await knex('maha_users').whereNull('activated_at').update({
      is_active: true
    })

  },

  down: async (knex) => {
  }

}

export default RemoveMemberActivity
