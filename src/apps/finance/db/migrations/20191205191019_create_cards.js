const CreateCard = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('finance_cards', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('customer_id').unsigned()
      table.foreign('customer_id').references('crm_contacts.id')
      table.enum('type', ['visa','mastercard','discover','amex','jcb'], { useNative: true, enumName: 'finance_cards_type' })
      table.string('last_four')
      table.string('expiration_month')
      table.string('expiration_year')
      table.string('braintree_id')
      table.timestamps()
    })

    await knex.schema.table('finance_payments', (table) => {
      table.dropColumn('card_type')
      table.dropColumn('code')
      table.dropColumn('metadata')
      table.integer('card_id').unsigned()
      table.foreign('card_id').references('finance_cards.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('finance_cards')
  }

}

export default CreateCard
