const UpdateConsents = {

  up: async (knex) => {
    await knex.schema.table('crm_consents', (table) => {
      table.enum('type', ['email','sms','voice','mail'], { useNative: true, enumName: 'crm_consent_type' })
      table.enum('optin_reason', ['consent','contract','legal obligation','vital interests','public interest','legitimate interest'], { useNative: true, enumName: 'crm_consent_optin_reason' })
      table.enum('optout_reason', ['done','never','inappropriate','spam','other'], { useNative: true, enumName: 'crm_consent_optout_reason' })
      table.text('optout_reason_other')
      table.dropColumn('unsubscribed_at')
      table.timestamp('optedin_at')
      table.timestamp('optedout_at')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateConsents
