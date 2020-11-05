import RevenueType from '../../finance/models/revenue_type'
import Project from '../../finance/models/project'
import Model from '@core/objects/model'
import Asset from '../../maha/models/asset'
import Reservation from './reservation'
import Adjustment from './adjustment'
import Discount from './discount'
import Product from './product'
import Photo from './photo'
import Item from './item'

const Variant = new Model({

  tableName: 'stores_variants',

  rules: {},

  virtuals: {},

  adjustments() {
    return this.hasMany(Adjustment, 'variant_id')
  },

  discounts() {
    return this.belongsToMany(Discount, 'stores_discounts_variants','variant_id','discount_id')
  },

  donation_revenue_type() {
    return this.belongsTo(RevenueType, 'donation_revenue_type_id')
  },

  file() {
    return this.belongsTo(Asset, 'file_id')
  },

  items() {
    return this.hasMany(Item, 'variant_id')
  },

  photos() {
    return this.hasMany(Photo, 'variant_id')
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
