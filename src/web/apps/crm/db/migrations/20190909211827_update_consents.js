const UpdateConsents = {

  up: async (knex) => {
    await knex.schema.table('crm_consents', (table) => {
      table.enum('type', ['email','sms','voice','mail'], { useNative: true, enumName: 'consent_type' })
      table.enum('optin_reason', ['consent','contract','legal obligation','vital interests','public interest','legitimate interest'], { useNative: true, enumName: 'consent_optin_reason' })
      table.enum('optout_reason', ['done','never','inappropriate','spam','other'], { useNative: true, enumName: 'consent_optout_reason' })
      table.text('optout_reason_other')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateConsents
