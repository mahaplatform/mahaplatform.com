const UpdateConsents = {

  up: async (knex) => {
    await knex.schema.table('crm_consents', (table) => {
      table.enum('optin_reason', ['consent','contract','legal obligation','vital interests','public interest','legitimate interest'], { useNative: true, enumName: 'optin_reason' })
      table.enum('optout_reason', ['done','never','inappropriate','spam','other'], { useNative: true, enumName: 'optout_reason' })
      table.text('optout_reason_other')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateConsents
