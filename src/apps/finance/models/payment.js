import Model from '../../../core/objects/model'
import Contact from '../../crm/models/contact'
import Disbursement from './disbursement'
import Scholarship from './scholarship'
import Merchant from './merchant'
import Invoice from './invoice'
import Credit from './credit'
import Refund from './refund'

const Payment = new Model({

  tableName: 'finance_payments',

  rules: {},

  virtuals: {},

  contact() {
    this.belongsTo(Contact, 'contact_id')
  },

  credit() {
    return this.belongsTo(Credit, 'credit_id')
  },

  disbursement() {
    return this.belongsTo(Disbursement, 'disbursement_id')
  },

  invoice() {
    return this.belongsTo(Invoice, 'invoice_id')
  },

  merchant() {
    return this.belongsTo(Merchant, 'merchant_id')
  },

  refunds() {
    return this.hasMany(Refund, 'payment_id')
  },

  scholarship() {
    return this.belongsTo(Scholarship, 'scholarship_id')
  }

})

export default Payment
