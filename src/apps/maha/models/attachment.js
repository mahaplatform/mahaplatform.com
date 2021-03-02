import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Asset from './asset'

const Attachment = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_attachments',

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  }

})

export default Attachment
