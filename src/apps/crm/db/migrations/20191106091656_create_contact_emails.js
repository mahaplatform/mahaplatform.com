const CreateContactEmail = {

  up: async (knex) => {

    await knex.schema.createTable('crm_contact_emails', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.string('subject')
      table.text('html')
      table.timestamps()
    })

    await knex.schema.table('crm_activities', (table) => {
      table.integer('contact_email_id').unsigned()
      table.foreign('contact_email_id').references('crm_contact_emails.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_contact_emails')
  }

}

export default CreateContactEmail
