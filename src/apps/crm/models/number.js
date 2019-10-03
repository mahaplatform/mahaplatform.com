import Model from '../../../web/core/objects/model'
import Program from './program'

const Number = new Model({

  tableName: 'crm_numbers',

  rules: {},

  virtuals: {},

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Number
