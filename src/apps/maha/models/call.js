import VoiceCampaign from '../../crm/models/voice_campaign'
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

  voice_campaign() {
    return this.hasOne(VoiceCampaign, 'voice_campaign_id')
  }

})

export default Call
