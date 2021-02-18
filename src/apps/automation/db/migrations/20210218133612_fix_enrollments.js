import ExecuteEnrollmentQueue from '@apps/automation/queues/execute_enrollment_queue'

const updateEnrollments = async (req, { workflow_id, state }) => {

  const enrollments = await req.trx('crm_workflow_enrollments').where('workflow_id', workflow_id)

  await Promise.mapSeries(enrollments, async (enrollment) => {

    await req.trx('crm_workflow_enrollments').where('id', enrollment.id).update('status', 'active')

    await ExecuteEnrollmentQueue.enqueue(req, {
      enrollment_id: enrollment.id,
      state
    })

  })

}

const FixEnrollments = {

  databaseName: 'maha',

  up: async (knex) => {

    const req = { trx: knex }

    await updateEnrollments(req, {
      workflow_id: 442,
      state: 'steps.4'
    })

    await updateEnrollments(req, {
      workflow_id: 457,
      state: 'steps.3'
    })


  },

  down: async (knex) => {
  }

}

export default FixEnrollments
