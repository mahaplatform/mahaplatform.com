const AddUserCellPhone = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_users', (table) => {
      table.string('cell_phone')
    })

  },

  down: async (knex) => {
  }

}

export default AddUserCellPhone
