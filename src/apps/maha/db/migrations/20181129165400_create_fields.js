const CreateFields = {

  up: async (knex) => {

    await knex.schema.createTable('maha_fields', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('parent_type')
      table.integer('parent_id')
      table.string('code')
      table.integer('delta')
      table.string('label')
      table.string('name')
      table.text('instructions')
      table.enum('type', ['addressfield','checkbox','checkboxgroup','colorfield','datefield','emailfield','filefield','imagefield','lookup','moneyfield','numberfield','phonefield','radiogroup','section','textfield','textarea','timefield','urlfield','videofield','htmlfield'])
      table.jsonb('config')
      table.timestamps()
    })

  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_fields')
  }

}

export default CreateFields
