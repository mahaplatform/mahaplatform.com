const CreateResponsibilityType = {

  up: async (knex) => {

    await knex.schema.createTable('appraisals_responsibility_types', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

    await knex('appraisals_responsibility_types').insert([
      { text: 'Direction' },
      { text: 'Management' },
      { text: 'Coordination/Operation' },
      { text: 'Professional Improvement and Other Duties as Assigned' }
    ])

  },

  down: async (knex) => {
    await knex.schema.dropTable('appraisals_responsibility_types')
  }

}

export default CreateResponsibilityType
