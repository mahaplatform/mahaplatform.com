import PhoneNumber from '../../crm/models/phone_number'
import Model from '../../../core/objects/model'
import Number from './number'

const Call = new Model({

  tableName: 'maha_calls',

  rules: {},

  virtuals: {},

  number() {
    return this.belongsTo(Number, 'number_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  }

})

export default Call
