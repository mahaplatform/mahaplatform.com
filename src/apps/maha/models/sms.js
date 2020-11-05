import PhoneNumber from '../../crm/models/phone_number'
import Model from '@core/objects/model'
import SMSAttachment from './sms_attachment'
import Number from './number'
import User from './user'

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
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Sms
