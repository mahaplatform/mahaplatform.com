import Model from '../../../core/objects/model'
import Asset from '../../maha/models/asset'
import Variant from './variant'

const Media = new Model({

  tableName: 'stores_media',

  rules: {},

  virtuals: {},

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  variant() {
    return this.belongsTo(Variant, 'variant_id')
  }

})

export default Media
