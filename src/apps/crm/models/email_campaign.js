import EmailCampaignResult from './email_campaign_result'
import MahaEmail from '../../maha/models/email'
import Model from '../../../core/objects/model'
import Workflow from './workflow'
import Program from './program'

const EmailCampaign = new Model({

  tableName: 'crm_email_campaigns',

  rules: {},

  virtuals: {},

  emails() {
    return this.hasMany(MahaEmail, 'email_campaign_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  results() {
    return this.hasOne(EmailCampaignResult, 'email_campaign_id')
  },

  workflows() {
    return this.hasMany(Workflow, 'email_campaign_id')
  }

})

export default EmailCampaign
