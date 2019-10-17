import WorkflowSerializer from '../../../../../serializers/workflow_serializer'
import VoiceCampaign from '../../../../../models/voice_campaign'
import Step from '../../../../../models/step'
import _ from 'lodash'

const findOrCreateStep = async (req, params) => {
  const step = await Step.query(qb => {
    qb.where('code', params.code)
  }).fetch({
    transacting: req.trx
  })
  if(step) return step
  return await Step.forge(params).save(null, {
    transacting: req.trx
  })
}

const updateRoute = async (req, res) => {

  const campaign = await VoiceCampaign.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('code', req.params.campaign_id)
  }).fetch({
    withRelated: ['workflow.steps.parent'],
    transacting: req.trx
  })

  if(!campaign) return res.status(404).respond({
    code: 404,
    message: 'Unable to load campaign'
  })

  const existing_codes = campaign.related('workflow').related('steps').map(step => {
    return step.get('code')
  })

  const incoming_codes = req.body.steps.map(data => {
    return data.code
  })

  const delete_codes = _.difference(existing_codes, incoming_codes)

  if(delete_codes.length > 0) {
    await Promise.mapSeries(delete_codes, async (code) => {
      await req.trx('crm_steps').where({ code }).del()
    })
  }

  const steps = await Promise.reduce(req.body.steps, async (steps, data) => {
    const step = await findOrCreateStep(req, {
      team_id: req.team.get('id'),
      workflow_id: campaign.get('workflow_id'),
      code: data.code,
      type: data.type,
      subtype: data.subtype
    })
    return {
      ...steps,
      [data.code]: step
    }
  }, {})

  await Promise.mapSeries(req.body.steps, async (data) => {
    await steps[data.code].save({
      parent_id: data.parent ? steps[data.parent].get('id') : null,
      delta: data.delta,
      answer: data.answer,
      config: data.config
    }, {
      transacting: req.trx
    })
  }, {})

  await campaign.related('workflow').load(['steps.parent'], {
    transacting: req.trx
  })

  res.status(200).respond(campaign.related('workflow'), WorkflowSerializer)

}

export default updateRoute
