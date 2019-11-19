const CreateRefund = {

  up: async (knex) => {
    await knex.schema.createTable('finance_refunds', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('payment_id').unsigned()
      table.foreign('payment_id').references('finance_payments.id')
      table.string('braintree_id')
      table.decimal('amount', 6, 2)
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('finance_refunds')
  }

}

export default CreateRefund
