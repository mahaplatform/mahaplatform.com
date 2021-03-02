import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const EmailCampaignResult = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_email_campaign_results',

  rules: {},

  virtuals: {}

})

export default EmailCampaignResult
