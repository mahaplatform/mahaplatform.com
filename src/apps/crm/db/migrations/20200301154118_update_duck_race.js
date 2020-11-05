import WorkflowEnrollment from '@apps/crm/models/workflow_enrollment'
import WorkflowAction from '@apps/crm/models/workflow_action'
import WorkflowStep from '@apps/crm/models/workflow_step'
import _ from 'lodash'

const UpdateDuckRace = {

  up: async (knex) => {

    await knex('crm_forms').where('id', 1).update({
      workflow_id: 1,
      email_id: 1
    })

    await knex('crm_workflows').where('id', 1).update({
      trigger_type: 'form_submission'
    })

    await knex('crm_emails').where('id', 1).update({
      workflow_id: 1
    })

    await WorkflowStep.forge({
      team_id: 1,
      workflow_id: 1,
      type: 'action',
      action: 'send_email',
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      delta: 0,
      config: {
        email: { id: 1, title: 'Confirmation' }
      }
    }).save(null, {
      transacting: knex
    })

    const responses = await knex('crm_responses').where('form_id', 1)

    await Promise.map(responses, async(response) => {

      const enrollment = await WorkflowEnrollment.forge({
        team_id: 1,
        workflow_id: 1,
        contact_id: response.contact_id,
        response_id: response.id,
        code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
        was_completed: true
      }).save(null, {
        transacting: knex
      })

      await WorkflowAction.forge({
        team_id: 1,
        enrollment_id: enrollment.get('id'),
        step_id: 1
      }).save(null, {
        transacting: knex
      })

    })

  },

  down: async (knex) => {
  }

}

export default UpdateDuckRace
