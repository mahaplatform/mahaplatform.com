const CreateResponsibilityType = {

  up: async (knex) => {

    await knex.schema.createTable('appraisals_responsibility_types', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

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

  },

  down: async (knex) => {
    await knex.schema.dropTable('appraisals_responsibility_types')
  }

}

export default CreateResponsibilityType
