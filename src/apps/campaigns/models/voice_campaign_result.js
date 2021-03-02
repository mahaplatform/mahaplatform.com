import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const VoiceCampaignResult = new Model(knex, {

  databaseName: 'maha',

  tableName: 'voice_campaign_results',

  rules: {},

  virtuals: {}

})

export default VoiceCampaignResult
