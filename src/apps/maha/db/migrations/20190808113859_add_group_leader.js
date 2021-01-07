const AddGroupLeader = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_groups', (table) => {
      table.integer('leader_id').unsigned()
      table.foreign('leader_id').references('maha_users.id')
    })

  },

  down: async (knex) => {
  }

}

export default AddGroupLeader
