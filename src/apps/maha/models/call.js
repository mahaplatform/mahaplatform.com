import VoiceCampaign from '../../crm/models/voice_campaign'
import PhoneNumber from '../../crm/models/phone_number'
import Program from '../../crm/models/program'
import Model from '../../../core/objects/model'
import Number from './number'
import User from './user'

const Call = new Model({

  tableName: 'maha_calls',

  rules: {},

  virtuals: {},

  from() {
    return this.belongsTo(Number, 'from_id')
  },

  to() {
    return this.belongsTo(Number, 'to_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  voice_campaign() {
    return this.hasOne(VoiceCampaign, 'voice_campaign_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Call
