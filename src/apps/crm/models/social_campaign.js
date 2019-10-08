import Model from '../../../core/objects/model'
import Profile from '../../maha/models/profile'
import Program from './program'

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
