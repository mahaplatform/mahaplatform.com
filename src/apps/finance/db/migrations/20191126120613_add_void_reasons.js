const AddVoidReasons = {

  databaseName: 'maha',

  up: async (knex) => {

    const models = ['invoices','payments','refunds']

    await Promise.mapSeries(models, async(model) => {
      await knex.schema.table(`finance_${model}`, (table) => {
        table.dropColumn('voided_at')
        table.date('voided_date')
        table.text('voided_reason')
      })
    })

  },

  down: async (knex) => {
  }

}

export default AddVoidReasons
