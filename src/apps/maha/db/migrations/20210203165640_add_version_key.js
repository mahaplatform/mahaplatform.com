import VoiceCampaignSerializer from '@apps/campaigns/serializers/voice_campaign_serializer'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import { createVersion } from '@apps/maha/services/versions'

const AddVersionKey = {

  databaseName: 'maha',

  up: async (knex) => {

    const req = { trx: knex }

    await knex.schema.table('maha_versions', (table) => {
      table.string('key')
    })

    const voice_campaigns = await VoiceCampaign.query(qb => {
      qb.select('crm_voice_campaigns.*','crm_voice_campaign_results.*')
      qb.innerJoin('crm_voice_campaign_results','crm_voice_campaign_results.voice_campaign_id','crm_voice_campaigns.id')
      qb.where('direction', 'inbound')
    }).fetchAll({
      withRelated: ['phone_number','program','steps','team'],
      transacting: req.trx
    })

    await Promise.mapSeries(voice_campaigns, async(voice_campaign) => {

      req.team = voice_campaign.related('team')

      const campaign = await VoiceCampaignSerializer(req, voice_campaign)

      await createVersion(req, {
        versionable_type: 'maha_phone_numbers',
        versionable_id: campaign.phone_number.id,
        key: 'config',
        value: { steps: campaign.steps }
      })

    })

  },

  down: async (knex) => {
  }

}

export default AddVersionKey
