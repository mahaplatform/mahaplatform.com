const AddResponsibilityTypes = {

  up: async (knex) => {

    await knex('appraisals_responsibility_types').del()

    await knex('appraisals_responsibility_types').insert([
      { text: 'Program Assessment' },
      { text: 'Program Development' },
      { text: 'Program Delivery' },
      { text: 'Program Evaluation' },
      { text: 'Applied Research' },
      { text: 'Direction' },
      { text: 'Management' },
      { text: 'Coordination/Operation' },
      { text: 'Professional Improvement' },
      { text: 'Heath and Safety' },
      { text: 'EEO/EPO and Policy' }
    ])

    await knex.schema.dropTable('appraisals_responsibilities')

    await knex.schema.createTable('appraisals_responsibilities', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('appraisal_id').unsigned()
      table.foreign('appraisal_id').references('appraisals_appraisals.id')
      table.integer('responsibility_type_id').unsigned()
      table.foreign('responsibility_type_id').references('appraisals_responsibility_types.id')
      table.integer('weight')
      table.integer('rating')
      table.text('comments')
      table.timestamps()
    })

  },

  down: async (knex) => {
  }

}

export default AddResponsibilityTypes
