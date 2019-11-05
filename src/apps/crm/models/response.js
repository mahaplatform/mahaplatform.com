import Model from '../../../core/objects/model'
import Contact from './contact'
import Form from './form'

const Response = new Model({

  tableName: 'crm_responses',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  form() {
    return this.belongsTo(Form, 'form_id')
  }

})

export default Response
