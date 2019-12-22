import Model from '../../../core/objects/model'
import RevenueType from './revenue_type'
import Project from './project'
import Product from './product'
import Invoice from './invoice'

const LineItem = new Model({

  tableName: 'finance_line_items',

  rules: {},

  virtuals: {},

  discount_revenue_type() {
    return this.belongsTo(RevenueType, 'discount_revenue_type_id')
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
