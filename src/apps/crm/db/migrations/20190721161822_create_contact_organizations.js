const CreateContactOrganizations = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('crm_contacts_organizations', (table) => {
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('organization_id').unsigned()
      table.foreign('organization_id').references('crm_organizations.id')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('crm_contacts')
  }

}

export default CreateContactOrganizations
