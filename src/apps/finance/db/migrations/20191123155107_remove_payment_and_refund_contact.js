const RemovePaymentAndRefundContact = {

  up: async (knex) => {

    await knex.schema.table('finance_payments', (table) => {
      table.dropColumn('contact_id')
    })

    await knex.schema.table('finance_refunds', (table) => {
      table.dropColumn('contact_id')
    })

  },

  down: async (knex) => {
  }

}

export default RemovePaymentAndRefundContact
