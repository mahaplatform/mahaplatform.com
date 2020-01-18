const ImportService = {

  up: async (knex) => {
    await knex.schema.table('maha_imports', (table) => {
      table.enum('service', ['excel','mailchimp','constantcontact','googlecontacts','outlook'], { useNative: true, enumName: 'crm_imports_service' })
    })
    await knex.raw('update maha_imports set service=\'excel\'')
  },

  down: async (knex) => {
  }

}

export default ImportService
