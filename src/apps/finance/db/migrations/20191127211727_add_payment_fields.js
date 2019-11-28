const AddPaymentFields = {

  up: async (knex) => {

    await knex.schema.table('finance_payments', (table) => {
      table.string('code')
      table.jsonb('metadata')
    })

    await knex.schema.table('finance_refunds', (table) => {
      table.dropColumn('type')
    })

    await knex.raw('DROP TYPE finance_refunds_type;')

    await knex.schema.table('finance_refunds', (table) => {
      table.enum('type', ['ach','card','credit'], { useNative: true, enumName: 'finance_refunds_type' })
    })

  },

  down: async (knex) => {
  }

}

export default AddPaymentFields
