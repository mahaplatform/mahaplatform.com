//https://www.routingnumbers.info/api/data.json?rn=221381867

const AddIntegrationToMerchant = {

  up: async (knex) => {

    await knex.schema.table('finance_merchants', (table) => {
      table.string('bank_name')
      table.string('routing_number')
      table.string('account_number')
      table.decimal('rate', 5, 4)
      table.decimal('amex_rate', 5, 4)
      table.boolean('has_paypal')
      table.jsonb('integration')
    })

    await knex.schema.table('finance_payments', (table) => {
      table.decimal('rate', 5, 4)
    })

  },

  down: async (knex) => {
  }

}

export default AddIntegrationToMerchant
