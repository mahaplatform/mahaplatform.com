const AddContactToAudit = {

  up: async (knex) => {

    await knex.schema.table('maha_audits', (table) => {
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
    })

  },

  down: async (knex) => {
  }

}

export default AddContactToAudit
