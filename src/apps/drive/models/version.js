import Model from '@core/objects/model'
import Asset from '@apps/maha/models/asset'
import User from '@apps/maha/models/user'
import File from './file'

const Version = new Model({

  databaseName: 'maha',

  tableName: 'drive_versions',

  asset: function() {
    return this.belongsTo(Asset, 'asset_id')
  },

  file: function() {
    return this.belongsTo(File, 'file_id')
  },

  user: function() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Version
