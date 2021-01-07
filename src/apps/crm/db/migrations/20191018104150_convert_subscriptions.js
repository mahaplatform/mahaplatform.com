const ConvertSubscriptions = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.dropTable('crm_subscriptions')

    await knex.schema.dropTable('crm_lists')

    await knex.schema.createTable('crm_lists', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.string('title')
      table.text('description')
      table.enum('type', ['static','smart'], { useNative: true, enumName: 'crm_lists_types' })
      table.jsonb('criteria')
      table.timestamps()
    })

    await knex.schema.createTable('crm_subscriptions', (table) => {
      table.integer('list_id').unsigned()
      table.foreign('list_id').references('crm_lists.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
    })

  },

  down: async (knex) => {
  }

}

export default ConvertSubscriptions
