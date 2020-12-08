import Workflow from '@apps/automation/models/workflow'

const RemoveDeadWorkflows = {

  up: async (knex) => {

    const workflows = await Workflow.query(qb => {
      qb.joinRaw('left join crm_workflow_steps on crm_workflow_steps.workflow_id=crm_workflows.id')
      qb.whereNull('crm_workflow_steps.id')
    }).fetchAll({
      transacting: knex
    })

    await Promise.mapSeries(workflows, async(workflow) => {
      await knex('crm_workflow_enrollments').where('workflow_id', workflow.id).del()
      await knex('crm_emails').where('workflow_id', workflow.id).del()
      await workflow.destroy({
        transacting: knex
      })
    })

  },

  down: async (knex) => {
  }

}

export default RemoveDeadWorkflows
