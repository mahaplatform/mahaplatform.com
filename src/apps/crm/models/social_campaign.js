import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Program from './program'
import Profile from '@apps/maha/models/profile'

const SocialCampaign = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_social_campaigns',

  rules: {},

  virtuals: {},

  profile() {
    return this.belongsTo(Profile, 'profile_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default SocialCampaign
