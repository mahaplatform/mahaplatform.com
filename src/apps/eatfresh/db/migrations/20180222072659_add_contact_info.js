const AddContactInfo = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('eatfresh_attractions', (table) => {
      table.string('contact_name')
      table.string('contact_email')
      table.string('contact_phone')
    })

  },

  down: async (knex) => {

  }

}

export default AddContactInfo
