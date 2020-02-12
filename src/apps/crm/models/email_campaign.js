import Model from '../../../core/objects/model'
import Workflow from './workflow'
import Program from './program'

const EmailCampaign = new Model({

  tableName: 'crm_email_campaigns',

  rules: {},

  virtuals: {},

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  workflow() {
    return this.hasOne(Workflow, 'email_campaign_id')
  }

})

export default EmailCampaign
