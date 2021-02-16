import { getEnrollmentParent, getEnrollmentTokens } from '@apps/automation/services/enrollments'
import ExecuteEnrollmentQueue from '@apps/automation/queues/execute_enrollment_queue'
import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import executeStep from '@apps/automation/services/workflows/execute_step'
import WorkflowAction from '@apps/automation/models/workflow_action'
import { renderWorkflow } from '@apps/automation/services/workflows'
import moment from 'moment'

const executeEnrollment = async (req, { enrollment_id, state }) => {

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('id', enrollment_id)
  }).fetch({
    withRelated: ['contact','version'],
    transacting: req.trx
  })

  const parent = await getEnrollmentParent(req, {
    enrollment
  })

  const tokens = await getEnrollmentTokens(req, {
    contact: enrollment.related('contact'),
    enrollment,
    program: parent.related('program')
  })

  const config = await renderWorkflow(req, {
    config: enrollment.related('version').get('value')
  })

  try {

    const result = await executeStep(req, {
      config,
      contact: enrollment.related('contact'),
      enrollment,
      program: parent.related('program'),
      state,
      tokens
    })

    console.log(result)

    if(result.action) {
      await WorkflowAction.forge({
        team_id: req.team.get('id'),
        enrollment_id: enrollment.get('id'),
        ...result.action
      }).save(null, {
        transacting: req.trx
      })
    }

    if(result.converted) {
      await enrollment.save({
        was_converted: true
      }, {
        transacting: req.trx,
        patch: true
      })
    }

    if(!result.next) {
      return await enrollment.save({
        completed_at: moment(),
        status: 'completed'
      }, {
        transacting: req.trx,
        patch: true
      })
    }

    await ExecuteEnrollmentQueue.enqueue(req, {
      enrollment_id: enrollment.get('id'),
      state: result.next
    })

  } catch(err) {

    await enrollment.save({
      status: 'failed',
      error: err.stack
    }, {
      transacting: req.trx,
      patch: true
    })

  }

}

export default executeEnrollment
