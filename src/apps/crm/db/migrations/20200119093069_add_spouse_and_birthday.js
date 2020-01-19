const AddSpouseAndBirthday = {

  up: async (knex) => {
    await knex.schema.table('crm_contacts', (table) => {
      table.string('spouse')
      table.string('birthday')
      table.integer('birth_year')
    })
  },

  down: async (knex) => {
  }

}

export default AddSpouseAndBirthday
