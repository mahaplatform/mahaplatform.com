import Payment from '@apps/finance/models/payment'
import Invoice from '@apps/finance/models/invoice'
import Contact from '@apps/crm/models/contact'
import Model from '@core/objects/model'
import Discount from './discount'
import Store from './store'
import Item from './item'
import Cart from './cart'

const Order = new Model({

  databaseName: 'maha',

  tableName: 'stores_orders',

  rules: {},

  virtuals: {

    url() {
      return `${process.env.WEB_HOST}/admin/stores/stores/${this.get('store_id')}/orders/${this.get('id')}`
    }

  },

  cart() {
    return this.belongsTo(Cart, 'cart_id')
  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  discount() {
    return this.belongsTo(Discount, 'discount_id')
  },

  invoice() {
    return this.belongsTo(Invoice, 'invoice_id')
  },

  items() {
    return this.hasMany(Item, 'order_id')
  },

  payment() {
    return this.belongsTo(Payment, 'payment_id')
  },

  store() {
    return this.belongsTo(Store, 'store_id')
  }

})

export default Order
