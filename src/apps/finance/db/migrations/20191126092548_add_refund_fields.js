const AddRefundFields = {

  up: async (knex) => {

    await knex.schema.table('finance_refunds', (table) => {
      table.enum('type', ['card','credit'], { useNative: true, enumName: 'finance_refunds_type' })
      table.enum('status', ['submitted','settled','voided'], { useNative: true, enumName: 'finance_refunds_status' })
      table.datetime('voided_at')
    })

    await knex.schema.table('finance_payments', (table) => {
      table.dropColumn('status')
    })

    await knex.raw('DROP TYPE finance_payments_status;')

    await knex.schema.table('finance_payments', (table) => {
      table.enum('status', ['received','captured','settled','disbursed','voided'], { useNative: true, enumName: 'finance_payments_status' })
    })

  },

  down: async (knex) => {
  }

}

export default AddRefundFields
