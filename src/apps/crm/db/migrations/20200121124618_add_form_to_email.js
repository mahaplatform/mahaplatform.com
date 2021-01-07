const AddFormToEmail = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_emails', (table) => {
      table.integer('form_id').unsigned()
      table.foreign('form_id').references('crm_forms.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddFormToEmail
