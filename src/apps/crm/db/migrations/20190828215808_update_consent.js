const UpdateConsent = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_consents', (table) => {
      table.integer('phone_number_id').unsigned()
      table.foreign('phone_number_id').references('crm_phone_numbers.id')
    })

    await knex.schema.table('crm_subscriptions', (table) => {
      table.integer('phone_number_id').unsigned()
      table.foreign('phone_number_id').references('crm_phone_numbers.id')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateConsent
