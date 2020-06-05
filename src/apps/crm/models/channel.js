import Model from '../../../core/objects/model'
import MailingAddress from './mailing_address'
import EmailAddress from './email_address'
import PhoneNumber from './phone_number'
import Program from './program'
import Contact from './contact'

const Channel = new Model({

  tableName: 'crm_channels',

  rules: {},

  virtuals: {
    key() {
      if(this.get('type') === 'email') return 'email_address_id'
      if(this.get('type') === 'sms') return 'phone_number_id'
      if(this.get('type') === 'voice') return 'phone_number_id'
      if(this.get('type') === 'mail') return 'mailing_address_id'
    }
  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  email_address() {
    return this.belongsTo(EmailAddress, 'email_address_id')
  },

  mailing_address() {
    return this.belongsTo(MailingAddress, 'mailing_address_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Channel
