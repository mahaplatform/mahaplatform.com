import Model from '../../../core/objects/model'
import EmailAddress from './email_address'
import Program from './program'

const Consent = new Model({

  tableName: 'crm_consents',

  rules: {},

  virtuals: {},

  email_address() {
    return this.belongsTo(EmailAddress, 'email_address_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Consent
