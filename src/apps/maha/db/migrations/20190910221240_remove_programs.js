const RemovePrograms = {

  up: async (knex) => {

    await knex.raw('drop view crm_channels')

    await Promise.mapSeries(['calls','consents','lists','activities','notes','topics'], async (type) => {
      await knex.schema.table(`crm_${type}`, (table) => {
        table.dropColumn('program_id')
      })
    })

    await knex.schema.dropTable('maha_program_accesses')

    await knex.schema.dropTable('maha_program_members')

    await knex.schema.dropTable('maha_programs')

  },

  down: async (knex) => {
  }

}

export default RemovePrograms
