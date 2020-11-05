import Workflow from '@apps/crm/models/workflow'

const WorkflowEmails = {

  up: async (knex) => {

    const workflows = await Workflow.fetchAll({
      withRelated: ['emails'],
      transacting: knex
    })

    await Promise.mapSeries(workflows, async(workflow) => {
      await Promise.mapSeries(workflow.related('emails'), async(email) => {
        await email.save({
          event_id: workflow.get('event_id'),
          form_id: workflow.get('form_id')
        }, {
          transacting: knex,
          patch: true
        })

      })
    })

  },

  down: async (knex) => {
  }

}

export default WorkflowEmails
