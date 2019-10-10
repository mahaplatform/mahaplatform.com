import Model from '../../../core/objects/model'
import SMS from './sms'

const SmsAttachment = new Model({

  tableName: 'crm_sms_attachments',

  rules: {},

  virtuals: {},

  sms() {
    return this.belongsTo(SMS, 'sms_id')
  }

})

export default SmsAttachment
