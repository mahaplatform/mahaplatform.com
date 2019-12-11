import PhoneNumber from '../../maha/models/phone_number'
import Merchant from '../../finance/models/merchant'
import Model from '../../../core/objects/model'
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
  },

  merchant() {
    return this.belongsTo(Merchant, 'merchant_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  }

})

export default Program
