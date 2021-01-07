const MigrateCommentsAndAudits = {

  databaseName: 'maha',

  up: async (knex) => {

    const tables  = ['audit','comment']

    await Promise.mapSeries(tables, async(table) => {

      const audits = await knex(`maha_${table}s`).whereRaw(`${table}able_type like ?`, 'expenses_%')

      await Promise.mapSeries(audits, async(audit) => {

        await knex(`maha_${table}s`).where({
          id: audit.id
        }).update({
          [`${table}able_type`]: audit[`${table}able_type`].replace('expenses_', 'finance_')
        })

      })

    })

  },

  down: async (knex) => {
  }

}

export default MigrateCommentsAndAudits
