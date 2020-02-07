const CreateSetting = {

  up: async (knex) => {

    await knex.schema.createTable('platform_settings', (table) => {
      table.increments('id').primary()
      table.jsonb('values')
    })

    await knex('platform_settings').insert({
      values: {
        applepay_enabled: false,
        googlepay_enabled: false,
        paypal_enabled: false
      }
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('platform_settings')
  }

}

export default CreateSetting
