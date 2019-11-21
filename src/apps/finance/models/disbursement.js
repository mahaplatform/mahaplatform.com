import Model from '../../../core/objects/model'
import Merchant from './merchant'
import Payment from './payment'

const Disbursement = new Model({

  tableName: 'finance_disbursements',

  rules: {},

  virtuals: {},

  merchant() {
    return this.belongsTo(Merchant, 'merchant_id')
  },

  payments() {
    return this.hasMany(Payment, 'disbursement_id')
  }

})

export default Disbursement
