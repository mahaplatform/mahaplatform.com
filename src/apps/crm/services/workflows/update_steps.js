import WorkflowStep from '../../models/workflow_step'

const getWorkflow = ({ voice_campaign, sms_campaign, workflow }) => {
  if(voice_campaign) return voice_campaign
  if(sms_campaign) return sms_campaign
  if(workflow) return workflow
}

export const updateSteps = async (req, params) => {

  const { steps } = params

  const workflow = getWorkflow(params)

  await workflow.load(['steps'], {
    transacting: req.trx
  })

  const delete_ids = workflow.related('steps').filter(existing => {
    return steps.find(step => {
      return step.id === existing.id
    }) === undefined
  }).map(step => step.get('id'))

  await req.trx('crm_workflow_steps').whereIn('id', delete_ids).del()

  await Promise.map(steps, async (step) => {

    if(!step.id) {
      return await WorkflowStep.forge({
        team_id: req.team.get('id'),
        voice_campaign_id: params.voice_campaign ? params.voice_campaign.get('id') : null,
        sms_campaign_id: params.sms_campaign ? params.sms_campaign.get('id') : null,
        workflow_id: params.workflow ? params.workflow.get('id') : null,
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
