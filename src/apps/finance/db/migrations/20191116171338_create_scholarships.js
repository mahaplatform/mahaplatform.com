const CreateScholarship = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('finance_scholarships', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.decimal('amount', 6, 2)
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('finance_scholarships')
  }

}

export default CreateScholarship
