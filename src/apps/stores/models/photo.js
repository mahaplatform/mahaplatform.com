import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Asset from '@apps/maha/models/asset'
import Variant from './variant'

const Photo = new Model(knex, {

  databaseName: 'maha',

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
