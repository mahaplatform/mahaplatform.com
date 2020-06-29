import Model from '../../../core/objects/model'
import Merchant from './merchant'
import Payment from './payment'
import numeral from 'numeral'
import moment from 'moment'

const Disbursement = new Model({

  tableName: 'finance_disbursements',

  rules: {},

  virtuals: {

    object_text: function() {
      return `${numeral(this.get('amount')).format('$0.00')} into ${this.related('merchant').get('title')} on ${moment(this.get('date')).format('MM/DD/YY')}`
    },

    object_type: function() {
      return 'disbursement'
    },

    object_url: function() {
      return `/admin/finance/disbursements/${this.get('id')}`
    }

  },

  merchant() {
    return this.belongsTo(Merchant, 'merchant_id')
  },

  payments() {
    return this.hasMany(Payment, 'disbursement_id')
  }

})

export default Disbursement
