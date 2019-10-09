import Model from '../../../core/objects/model'
import Contact from './contact'

const Email = new Model({

  tableName: 'crm_emails',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  }

})

export default Email
