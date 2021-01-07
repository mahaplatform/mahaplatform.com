import Model from '@core/objects/model'
import RevenueType from './revenue_type'
import Project from './project'
import Invoice from './invoice'

const LineItem = new Model({

  databaseName: 'maha',

  tableName: 'finance_line_items',

  rules: {},

  virtuals: {

    refundable() {
      return (this.get('total') - this.get('refunded')).toFixed(2)
    }

  },

  discount_revenue_type() {
    return this.belongsTo(RevenueType, 'discount_revenue_type_id')
  },

  invoice() {
    return this.belongsTo(Invoice, 'invoice_id')
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  },

  revenue_type() {
    return this.belongsTo(RevenueType, 'revenue_type_id')
  }

})

export default LineItem
