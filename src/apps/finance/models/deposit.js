import Model from '../../../core/objects/model'
import Bank from './bank'
import Payment from './payment'
import numeral from 'numeral'
import moment from 'moment'

const Deposit = new Model({

  tableName: 'finance_deposits',

  rules: {},

  virtuals: {

    object_text: function() {
      return `${numeral(this.get('amount')).format('$0.00')} into ${this.related('bank').get('title')} on ${moment(this.get('date')).format('MM/DD/YY')}`
    },

    object_type: function() {
      return 'deposit'
    },

    object_url: function() {
      return `/admin/finance/deposits/${this.get('id')}`
    }

  },

  bank() {
    return this.belongsTo(Bank, 'bank_id')
  },

  payments() {
    return this.hasMany(Payment, 'deposit_id')
  }

})

export default Deposit
