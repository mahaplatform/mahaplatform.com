const AddAssignmentCompletion = {

  up: async (knex) => {

    await knex.schema.table('training_trainings', (table) => {
      table.boolean('is_verification_required')
      table.text('notes')
    })

    await knex.schema.table('training_fulfillments', (table) => {
      table.integer('verification_id').unsigned()
      table.foreign('verification_id').references('maha_assets.id')
    })

    await knex.schema.table('training_assignments', (table) => {
      table.boolean('is_completed')
    })

  },

  down: async (knex) => {
  }

}

export default AddAssignmentCompletion
