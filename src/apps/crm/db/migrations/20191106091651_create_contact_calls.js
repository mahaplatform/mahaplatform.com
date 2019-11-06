const CreateContactCall = {

  up: async (knex) => {

    await knex.schema.table('crm_activities', (table) => {
      table.dropColumn('call_id')
    })

    await knex.schema.dropTable('crm_calls')

    await knex.schema.createTable('crm_contact_calls', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.date('date')
      table.time('time')
      table.text('description')
      table.timestamps()
    })

    await knex.schema.table('crm_activities', (table) => {
      table.integer('contact_call_id').unsigned()
      table.foreign('contact_call_id').references('crm_contact_calls.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_contact_calls')
  }

}

export default CreateContactCall
