const ChannelCodes = {

  up: async (knex) => {

    await Promise.map(['email_addresses','phone_numbers','mailing_addresses'], async (model) => {
      await knex.schema.table(`crm_${model}`, (table) => {
        table.string('code')
      })
    })

  },

  down: async (knex) => {
  }

}

export default ChannelCodes
