import Model from '../../../core/objects/model'
import EmailAddress from './email_address'
import PhoneNumber from './phone_number'
import Program from './program'

const Consent = new Model({

  tableName: 'crm_consents',

  rules: {},

  virtuals: {},

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

export default Consent
