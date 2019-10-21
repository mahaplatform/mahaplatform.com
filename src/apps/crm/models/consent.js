import Model from '../../../core/objects/model'
import Program from './program'
import MailingAddress from './mailing_address'
import EmailAddress from './email_address'
import PhoneNumber from './phone_number'

const Consent = new Model({

  tableName: 'crm_consents',

  rules: {},

  virtuals: {},

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

export default Consent
