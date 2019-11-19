import Model from '../../../core/objects/model'
import RevenueType from './revenue_type'
import Project from './project'

const Product = new Model({

  tableName: 'finance_products',

  rules: {},

  virtuals: {},

  revenue_type() {
    return this.belongsTo(RevenueType, 'revenue_type_id')
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  }

})

export default Product
