const AddEnrollmentData = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.jsonb('data')
    })

    const enrollments = await knex('crm_workflow_enrollments')

    await Promise.mapSeries(enrollments, async(enrollment) => {
      await knex('crm_workflow_enrollments').where('id', enrollment.id).update({
        data: {}
      })
    })

    const actions = await knex('crm_workflow_actions')

    await Promise.mapSeries(actions, async(action) => {
      await knex('crm_workflow_actions').where('id', action.id).update({
        data: {}
      })
    })
  },

  down: async (knex) => {
  }

}

export default AddEnrollmentData
