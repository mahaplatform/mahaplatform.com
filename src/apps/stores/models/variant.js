import Model from '../../../core/objects/model'
import Product from './product'

const Variant = new Model({

  tableName: 'store_variants',

  rules: {},

  virtuals: {},

  product() {
    return this.belongsTo(Product, 'product_id')
  }

})

export default Variant
