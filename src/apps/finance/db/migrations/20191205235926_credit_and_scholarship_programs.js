const CreditAndScholarshipPrograms = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('finance_credits', (table) => {
      table.dropColumn('description')
    })
    await Promise.mapSeries(['credits','scholarships'], async(model) => {
      await knex.schema.table(`finance_${model}`, (table) => {
        table.integer('program_id').unsigned()
        table.foreign('program_id').references('crm_programs.id')
        table.string('description')
      })
    })

  },

  down: async (knex) => {
  }

}

export default CreditAndScholarshipPrograms
