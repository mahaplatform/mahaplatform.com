import Model from '@core/objects/model'
import Asset from '../../maha/models/asset'
import Variant from './variant'

const Photo = new Model({

  tableName: 'stores_photos',

  rules: {},

  virtuals: {},

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  variant() {
    return this.belongsTo(Variant, 'variant_id')
  }

})

export default Photo
