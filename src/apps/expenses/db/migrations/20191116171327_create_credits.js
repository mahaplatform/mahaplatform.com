const CreateCredit = {

  up: async (knex) => {
    await knex.schema.createTable('expenses_credits', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.decimal('amount',6, 2)
      table.text('description')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('expenses_credits')
  }

}

export default CreateCredit
