import Model from '../../../core/objects/model'
import Program from '../../maha/models/program'
import Number from '../../maha/models/number'

const SmsCampaign = new Model({

  tableName: 'crm_sms_campaigns',

  rules: {},

  virtuals: {},

  number() {
    return this.belongsTo(Number, 'number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default SmsCampaign
