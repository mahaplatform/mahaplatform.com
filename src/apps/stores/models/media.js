import Model from '../../../core/objects/model'
import Asset from '../../maha/models/asset'
import Product from './product'

const Media = new Model({

  tableName: 'stores_media',

  rules: {},

  virtuals: {},

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  product() {
    return this.belongsTo(Product, 'product_id')
  }

})

export default Media
