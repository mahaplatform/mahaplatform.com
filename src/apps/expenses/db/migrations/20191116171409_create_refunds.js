const CreateRefund = {

  up: async (knex) => {
    await knex.schema.createTable('expenses_refunds', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('payment_id').unsigned()
      table.foreign('payment_id').references('expenses_payments.id')
      table.string('braintree_id')
      table.decimal('amount', 6, 2)
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('expenses_refunds')
  }

}

export default CreateRefund
