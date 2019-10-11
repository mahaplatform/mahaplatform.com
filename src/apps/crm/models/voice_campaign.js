import Model from '../../../core/objects/model'
import Number from '../../maha/models/number'
import Program from './program'

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
