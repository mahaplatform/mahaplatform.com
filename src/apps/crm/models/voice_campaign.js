import Model from '../../../core/objects/model'
import Program from './program'
import Number from './number'

const VoiceCampaign = new Model({

  tableName: 'crm_voice_campaigns',

  rules: {},

  virtuals: {},

  number() {
    return this.belongsTo(Number, 'number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default VoiceCampaign
