import Model from '../../../core/objects/model'
import SMSAttachment from './sms_attachment'
import Number from './number'

const Sms = new Model({

  tableName: 'maha_smses',

  rules: {},

  virtuals: {},

  attachments() {
    return this.hasMany(SMSAttachment, 'sms_id')
  },

  from() {
    return this.belongsTo(Number, 'from_id')
  },

  to() {
    return this.belongsTo(Number, 'to_id')
  }

})

export default Sms
