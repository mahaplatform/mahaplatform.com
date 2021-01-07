import MailingAddress from '@apps/crm/models/mailing_address'
import EmailAddress from '@apps/crm/models/email_address'
import PhoneNumber from '@apps/crm/models/phone_number'
import Model from '@core/objects/model'
import Contact from '@apps/crm/models/contact'

const Recipient = new Model({

  databaseName: 'maha',

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
