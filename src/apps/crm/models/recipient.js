import Model from '../../../core/objects/model'
import MailingAddress from './mailing_address'
import EmailAddress from './email_address'
import PhoneNumber from './phone_number'
import Contact from './contact'

const Recipient = new Model({

  tableName: 'crm_recipients',

  rules: {},

  virtuals: {},

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
  }

})

export default Recipient
