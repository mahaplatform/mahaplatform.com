const UpdateContact = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_contacts', (table) => {
      table.string('code')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateContact
