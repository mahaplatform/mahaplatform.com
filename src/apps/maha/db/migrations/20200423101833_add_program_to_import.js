const AddProgramToImport = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('maha_imports', (table) => {
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
    })
    await knex('maha_imports').whereIn('id', [100,101]).update({
      program_id: 6
    })
    await knex('maha_imports').whereIn('id', [102,103,104,105]).update({
      program_id: 11
    })
  },

  down: async (knex) => {
  }

}

export default AddProgramToImport
