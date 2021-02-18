import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import SMSCampaign from '@apps/campaigns/models/sms_campaign'
import { createVersion } from '@apps/maha/services/versions'
import Workflow from '@apps/automation/models/workflow'

const updateConfig = async (req, { items, table }) => {

  await Promise.mapSeries(items, async(item) => {

    req.team = item.related('team')

    const version = await createVersion(req, {
      versionable_type: table,
      versionable_id: item.id,
      key: 'config',
      value: {
        steps: item.related('steps').map(step => ({
          type: step.get('type'),
          action: step.get('action'),
          code: step.get('code'),
          delta: step.get('delta'),
          parent: step.get('parent'),
          answer: step.get('answer'),
          config: step.get('config')
        }))
      },
      publish: true
    })

    await Promise.mapSeries(item.related('enrollments'), async (enrollment) => {
      await Promise.mapSeries(enrollment.related('actions'), async (action) => {
        await action.save({
          step: {
            action: action.related('step').get('action'),
            config: action.related('step').get('config'),
            type: action.related('step').get('type')
          }
        }, {
          transacting: req.trx,
          patch: true
        })
      })
      await enrollment.save({
        version_id: version.get('id')
      }, {
        transacting: req.trx,
        patch: true
      })
    })

  })
}

const updateConfigs = {

  databaseName: 'maha',

  up: async (knex) => {

    const req = { trx: knex }

    await knex.schema.table('crm_voice_campaigns', (table) => {
      table.dropColumn('config')
    })

    await knex.schema.table('crm_sms_campaigns', (table) => {
      table.dropColumn('config')
    })

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.integer('version_id').unsigned()
      table.foreign('version_id').references('maha_versions.id')
    })

    await knex.schema.table('crm_workflow_actions', (table) => {
      table.jsonb('step')
    })

    const voice_campaigns = await VoiceCampaign.fetchAll({
      withRelated: ['enrollments.actions.step','steps','team'],
      transacting: req.trx
    })

    await updateConfig(req, {
      items: voice_campaigns,
      table: 'crm_voice_campaigns'
    })

    const sms_campaigns = await SMSCampaign.fetchAll({
      withRelated: ['enrollments.actions.step','steps','team'],
      transacting: req.trx
    })

    await updateConfig(req, {
      items: sms_campaigns,
      table: 'crm_sms_campaigns'
    })

    const workflows = await Workflow.fetchAll({
      withRelated: ['enrollments.actions.step','steps','team'],
      transacting: req.trx
    })

    await updateConfig(req, {
      items: workflows,
      table: 'crm_workflows'
    })

    await knex.schema.table('crm_workflow_recordings', (table) => {
      table.dropColumn('action_id')
    })

    await knex.schema.table('crm_workflow_actions', (table) => {
      table.dropColumn('recording_id')
    })

    await knex.raw('drop table crm_workflow_recordings')

    await knex.schema.table('crm_workflow_actions', (table) => {
      table.dropColumn('step_id')
    })

    await knex.raw('drop table crm_workflow_steps')

    await knex.schema.table('crm_workflow_actions', (table) => {
      table.integer('recording_id').unsigned()
      table.foreign('recording_id').references('maha_assets.id')
      table.integer('voicemail_id').unsigned()
      table.foreign('voicemail_id').references('maha_voicemails.id')
    })

  },

  down: async (knex) => {
  }

}

export default updateConfigs
