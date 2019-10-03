const CreateList = {

  up: async (knex) => {
    await knex.schema.createTable('crm_lists', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('name')
      table.text('description')
      table.enum('type', ['static','smart'])
      table.jsonb('criteria')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_lists')
  }

}

export default CreateList
