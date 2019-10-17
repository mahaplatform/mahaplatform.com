import Model from '../../../core/objects/model'
import Program from './program'
import Number from './number'

const PhoneNumber = new Model({

  tableName: 'maha_phone_numbers',

  rules: {},

  virtuals: {

    formatted() {
      const parts = this.get('number').match(/\+1(\d{3})(\d{3})(\d{4})/)
      return `(${parts[1]}) ${parts[2]}-${parts[3]}`
    }

  },

  from() {
    return this.belongsTo(Number, 'from_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  to() {
    return this.belongsTo(Number, 'to_number_id')
  }

})

export default PhoneNumber
