import Model from '@core/objects/model'
import Asset from './asset'

const Attachment = new Model({

  databaseName: 'maha',

  tableName: 'maha_attachments',

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  }

})

export default Attachment
