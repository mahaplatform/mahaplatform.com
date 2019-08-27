import Model from '../../../core/objects/model'
import Consent from './consent'
import List from './list'

const Program = new Model({

  tableName: 'crm_programs',

  rules: {},

  virtuals: {},

  consents() {
    return this.hasMany(Consent, 'program_id')
  },

  lists() {
    return this.hasMany(List, 'program_id')
  }

})

export default Program
