import DepositLineItem from './deposit_line_item'
import Model from '@core/objects/model'
import Payment from './payment'
import numeral from 'numeral'
import Refund from './refund'
import moment from 'moment'
import Bank from './bank'

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
      return `/finance/deposits/${this.get('id')}`
    }

  },

  bank() {
    return this.belongsTo(Bank, 'bank_id')
  },

  line_items() {
    return this.hasMany(DepositLineItem, 'deposit_id').query(qb => {
      qb.orderByRaw('payment_id asc, refund_id asc')
    })
  },

  payments() {
    return this.hasMany(Payment, 'deposit_id')
  },

  refunds() {
    return this.hasMany(Refund, 'deposit_id')
  }

})

export default Deposit
