import Model from '../../../core/objects/model'
import Product from './product'
import Invoice from './invoice'

const LineItem = new Model({

  tableName: 'finance_line_items',

  rules: {},

  virtuals: {

    tax() {
      return Number(this.get('total') * this.get('tax_rate'))
    },

    total() {
      return Number(this.get('quantity') * this.get('price'))
    }

  },

  invoice() {
    return this.belongsTo(Invoice, 'invoice_id')
  },

  product() {
    return this.belongsTo(Product, 'product_id')
  }

})

export default LineItem
