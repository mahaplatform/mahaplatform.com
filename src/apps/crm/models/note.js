import Model from '../../../core/objects/model'
import Program from '../../maha/models/program'

import Contact from './contact'

const Note = new Model({

  tableName: 'crm_notes',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default Note
