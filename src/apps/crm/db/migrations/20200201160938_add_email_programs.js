const AddEmailPrograms = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_emails', (table) => {
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddEmailPrograms
