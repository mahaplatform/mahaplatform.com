const MigratePrograms = {

  up: async (knex) => {

    await Promise.mapSeries(['consents','lists','activities','notes','calls','topics'], async (type) => {
      await knex.schema.table(`crm_${type}`, (table) => {
        table.dropColumn('program_id')
      })
      await knex.schema.table(`crm_${type}`, (table) => {
        table.integer('program_id').unsigned()
        table.foreign('program_id').references('maha_programs.id')
      })
    })

    await knex.schema.dropTable('crm_program_accesses')

    await knex.schema.dropTable('crm_programs')

  },

  down: async (knex) => {
  }

}

export default MigratePrograms
