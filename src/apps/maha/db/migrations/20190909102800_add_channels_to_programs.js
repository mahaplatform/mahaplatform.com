const AddChannelsToPrograms = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('maha_programs', (table) => {
      table.bool('has_email_channel')
      table.bool('has_sms_channel')
      table.bool('has_voice_channel')
      table.bool('has_mail_channel')
    })
  },

  down: async (knex) => {
  }

}

export default AddChannelsToPrograms
