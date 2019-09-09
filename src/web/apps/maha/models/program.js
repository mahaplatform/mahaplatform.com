import Model from '../../../core/objects/model'
import ProgramAccess from './program_access'
import Asset from './asset'

const Program = new Model({

  tableName: 'maha_programs',

  rules: {},

  virtuals: {},

  logo() {
    return this.belongsTo(Asset, 'logo_id')
  },

  accesses() {
    return this.hasMany(ProgramAccess, 'program_id')
  }

})

export default Program
