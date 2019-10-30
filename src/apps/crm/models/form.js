import Model from '../../../core/objects/model'
import Program from './program'

const Form = new Model({

  tableName: 'crm_forms',

  rules: {},

  virtuals: {},

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Form
