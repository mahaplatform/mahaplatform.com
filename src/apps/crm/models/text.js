import Model from '../../../core/objects/model'
import PhoneNumber from './phone_number'
import Program from './program'
import Contact from './contact'
import Number from './number'

const Text = new Model({

  tableName: 'crm_texts',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  number() {
    return this.belongsTo(Number, 'number_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Text
