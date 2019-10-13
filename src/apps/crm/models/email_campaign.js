import Model from '../../../core/objects/model'
import Program from '../../maha/models/program'
import Sender from './sender'

const EmailCampaign = new Model({

  tableName: 'crm_email_campaigns',

  rules: {},

  virtuals: {},

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  sender() {
    return this.belongsTo(Sender, 'sender_id')
  }

})

export default EmailCampaign
