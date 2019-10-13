import Model from '../../../core/objects/model'
import Program from '../../maha/models/program'
import Contact from './contact'

const Call = new Model({

  tableName: 'crm_calls',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Call
