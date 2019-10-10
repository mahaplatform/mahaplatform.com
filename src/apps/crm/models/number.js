import Model from '../../../core/objects/model'
import Program from './program'

const Number = new Model({

  tableName: 'crm_numbers',

  rules: {},

  virtuals: {

    international() {
      return `+1${this.get('number').replace(/[^\d]/g,'')}`
    }

  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Number
