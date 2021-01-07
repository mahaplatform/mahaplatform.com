const CreateDisbursement = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('finance_disbursements', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('merchant_id').unsigned()
      table.foreign('merchant_id').references('finance_merchants.id')
      table.date('date')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('finance_disbursements')
  }

}

export default CreateDisbursement
