import Model from '../../../web/core/objects/model'
import ProgramAccess from './program_access'
import Asset from '../../maha/models/asset'

const Program = new Model({

  tableName: 'crm_programs',

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
