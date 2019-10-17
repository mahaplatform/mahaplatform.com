import PhoneNumber from '../../maha/models/phone_number'
import Model from '../../../core/objects/model'
import Program from '../../maha/models/program'

const VoiceCampaign = new Model({

  tableName: 'crm_voice_campaigns',

  rules: {},

  virtuals: {},

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default VoiceCampaign
