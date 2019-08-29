import Model from '../../../core/objects/model'
import ProgramAccess from './program_access'
import Consent from './consent'
import List from './list'

const Program = new Model({

  tableName: 'crm_programs',

  rules: {},

  virtuals: {},

  accesses() {
    return this.hasMany(ProgramAccess, 'program_id')
  },

  consents() {
    return this.hasMany(Consent, 'program_id')
  },

  lists() {
    return this.hasMany(List, 'program_id')
  }

})

export default Program
