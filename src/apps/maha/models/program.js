import Model from '../../../core/objects/model'
import ProgramAccess from './program_access'
import Asset from '../../maha/models/asset'
import PhoneNumber from './phone_number'

const Program = new Model({

  tableName: 'maha_programs',

  rules: {},

  virtuals: {},

  logo() {
    return this.belongsTo(Asset, 'logo_id')
  },

  accesses() {
    return this.hasMany(ProgramAccess, 'program_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  }

})

export default Program
