import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Asset from './asset'

const Image = new Model(knex, {

  databaseName: 'maha_images',

  tableName: 'images',

  rules: {},

  virtuals: {},

  belongsTo() {
    this.belongsTo(Asset, 'asset_id')
  }

})

export default Image
