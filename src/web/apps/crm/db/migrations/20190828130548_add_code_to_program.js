const AddCodeToProgram = {

  up: async (knex) => {

    await knex.schema.table('crm_programs', (table) => {
      table.string('code')
    })

  },

  down: async (knex) => {
  }

}

export default AddCodeToProgram
