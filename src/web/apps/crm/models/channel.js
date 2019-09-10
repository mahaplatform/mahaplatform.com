import Model from '../../../core/objects/model'
import Program from '../../maha/models/program'
import EmailAddress from './email_address'
import PhoneNumber from './phone_number'
import Address from './address'

const Channel = new Model({

  tableName: 'crm_channels',

  rules: {},

  virtuals: {
    key() {
      if(this.get('type') === 'email') return 'email_address_id'
      if(this.get('type') === 'sms') return 'phone_number_id'
      if(this.get('type') === 'voice') return 'phone_number_id'
      if(this.get('type') === 'mail') return 'address_id'
    }
  },

  address() {
    return this.belongsTo(Address, 'address_id')
  },

  email_address() {
    return this.belongsTo(EmailAddress, 'email_address_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Channel
