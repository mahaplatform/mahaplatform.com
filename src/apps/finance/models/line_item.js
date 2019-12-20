import Model from '../../../core/objects/model'
import RevenueType from './revenue_type'
import Project from './project'
import Product from './product'
import Invoice from './invoice'
import Customer from './customer'

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
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  },

  revenue_type() {
    return this.belongsTo(RevenueType, 'revenue_type_id')
  }

})

export default LineItem
