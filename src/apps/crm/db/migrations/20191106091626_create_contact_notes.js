const CreateNote = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_activities', (table) => {
      table.dropColumn('note_id')
    })

    await knex.schema.dropTable('crm_notes')

    await knex.schema.createTable('crm_contact_notes', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.text('text')
      table.timestamps()
    })

    await knex.schema.table('crm_activities', (table) => {
      table.integer('contact_note_id').unsigned()
      table.foreign('contact_note_id').references('crm_contact_notes.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_contact_notes')
  }

}

export default CreateNote
