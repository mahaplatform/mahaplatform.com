import RevenueType from '../../finance/models/revenue_type'
import Project from '../../finance/models/project'
import Model from '../../../core/objects/model'
import Product from './product'

const Variant = new Model({

  tableName: 'stores_variants',

  rules: {},

  virtuals: {},

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

export default Variant
