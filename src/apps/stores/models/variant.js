import RevenueType from '../../finance/models/revenue_type'
import Project from '../../finance/models/project'
import Model from '../../../core/objects/model'
import Reservation from './reservation'
import Product from './product'
import Media from './media'

const Variant = new Model({

  tableName: 'stores_variants',

  rules: {},

  virtuals: {

    inventory_available() {
      return Number(this.get('inventory_quantity')) - Number(this.get('inventory_reserved'))
    }

  },

  donation_revenue_type() {
    return this.belongsTo(RevenueType, 'donation_revenue_type_id')
  },

  media() {
    return this.hasMany(Media, 'variant_id')
  },

  product() {
    return this.belongsTo(Product, 'product_id')
  },

  project() {
    return this.belongsTo(Project, 'project_id')
  },

  reservation() {
    return this.hasOne(Reservation, 'variant_id')
  },

  revenue_type() {
    return this.belongsTo(RevenueType, 'revenue_type_id')
  }

})

export default Variant
