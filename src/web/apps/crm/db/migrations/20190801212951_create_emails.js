const CreateEmail = {

  up: async (knex) => {
    await knex.schema.createTable('crm_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_emails')
  }

}

export default CreateEmail
