import Model from '../../../core/objects/model'
import Response from './response'
import Program from './program'
import Email from './email'

const Form = new Model({

  tableName: 'crm_forms',

  rules: {},

  virtuals: {

    num_responses() {
      return this.related('responses').length
    }

  },

  email() {
    return this.hasOne(Email, 'form_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  responses() {
    return this.hasMany(Response, 'form_id')
  }

})

export default Form
