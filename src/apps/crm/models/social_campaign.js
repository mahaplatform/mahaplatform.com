import Model from '@core/objects/model'
import Program from './program'
import Profile from '../../maha/models/profile'

const SocialCampaign = new Model({

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
