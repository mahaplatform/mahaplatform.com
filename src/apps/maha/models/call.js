import VoiceCampaign from '../../crm/models/voice_campaign'
import PhoneNumber from '../../crm/models/phone_number'
import Model from '../../../core/objects/model'
import Number from './number'

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

  voice_campaign() {
    return this.hasOne(VoiceCampaign, 'voice_campaign_id')
  }

})

export default Call
