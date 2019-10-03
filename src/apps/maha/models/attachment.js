import Model from '../../../web/core/objects/model'
import Asset from './asset'

const Attachment = new Model({

  tableName: 'maha_attachments',

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  }

})

export default Attachment
