const CreateResponsibility = {

  up: async (knex) => {
    await knex.schema.createTable('appraisals_responsibilities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('appraisal_id').unsigned()
      table.foreign('appraisal_id').references('appraisals_appraisals.id')
      table.text('description')
      table.integer('weight')
      table.integer('responsibility_1_rating')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('appraisals_responsibilities')
  }

      await knex.schema.createTable('appraisals_responsibilities', (table) => {
        table.increments('id').primary()
        table.integer('team_id').unsigned()
        table.foreign('team_id').references('maha_teams.id')
        table.integer('appraisal_id').unsigned()
        table.foreign('appraisal_id').references('appraisals_appraisals.id')
        table.integer('type_id').unsigned()
        table.foreign('type_id').references('appraisals_responsibility_types.id')
        table.integer('weight')
        table.integer('rating')
        table.text('comment')
        table.timestamps()
      })
}

export default CreateResponsibility
