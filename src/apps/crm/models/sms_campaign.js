import PhoneNumber from '../../maha/models/phone_number'
import Model from '../../../core/objects/model'
import Program from '../../maha/models/program'
import Workflow from './workflow'

const SmsCampaign = new Model({

  tableName: 'crm_sms_campaigns',

  rules: {},

  virtuals: {},

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default SmsCampaign
