import Model from '../../../core/objects/model'
import Contact from './contact'

const EmailAddress = new Model({

  tableName: 'crm_email_addresses',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  }

})

export default EmailAddress
