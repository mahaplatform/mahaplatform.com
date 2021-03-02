import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const SmsCampaignResult = new Model(knex, {

  databaseName: 'maha',

  tableName: 'sms_campaign_results',

  rules: {},

  virtuals: {}

})

export default SmsCampaignResult
