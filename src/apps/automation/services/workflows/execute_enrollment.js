import { getEnrollmentParent, getEnrollmentTokens } from '@apps/automation/services/enrollments'
import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import WorkflowAction from '@apps/automation/models/workflow_action'
import executeStep from './execute_step'

const executeEnrollment = async (req, { enrollment_id, state }) => {

  const enrollment = await WorkflowEnrollment.query(qb => {
    qb.where('id', enrollment_id)
  }).fetch({
    withRelated: ['contact'],
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

  try {

    const result = await executeStep(req, {
      config: parent.get('config'),
      contact: enrollment.related('contact'),
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

    if(result.next) {
      await executeEnrollment(req, {
        enrollment_id: enrollment.get('id'),
        state: result.next
      })
    }

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
