const UpdateNotesAndCalls = {

  databaseName: 'maha',

  up: async (knex) => {

    await Promise.map(['activities','notes','calls'], async(type) => {
      await knex.schema.table(`crm_${type}`, (table) => {
        table.integer('program_id').unsigned()
        table.foreign('program_id').references('crm_programs.id')
      })
    })

    await knex.schema.table('crm_programs', (table) => {
      table.bool('is_private')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateNotesAndCalls
