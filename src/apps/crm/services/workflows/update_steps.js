import WorkflowStep from '../../models/workflow_step'

export const updateSteps = async (req, { workflow, steps }) => {

  await workflow.load(['steps'], {
    transacting: req.trx
  })

  const delete_ids = workflow.related('steps').filter(existing => {
    return steps.find(step => {
      return step.id === existing.id
    })=== undefined
  }).map(step => step.get('id'))

  await req.trx('crm_workflow_steps').whereIn('id', delete_ids).del()

  await Promise.map(steps, async (step) => {

    if(!step.id) {
      return await WorkflowStep.forge({
        team_id: req.team.get('id'),
        workflow_id: workflow.get('id'),
        ...step
      }).save(null, {
        transacting: req.trx
      })
    }

    const workflow_step = await WorkflowStep.query(qb => {
      qb.where('id', step.id)
    }).fetch({
      transacting: req.trx
    })

    await workflow_step.save(step, {
      patch: true,
      transacting: req.trx
    })

  })

}
