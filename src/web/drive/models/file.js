import { Model, Asset } from 'maha'
import Access from './access'
import Folder from './folder'
import Version from './version'

const File = new Model({

  tableName: 'drive_files',

  virtuals: {

    label: function() {
      return this.related('asset').get('original_file_name')
    }

  },

  accesses: function() {
    return this.hasMany(Access, 'code', 'code')
  },

  asset: function() {
    return this.belongsTo(Asset, 'asset_id')
  },

  current_version: function() {
    return this.belongsTo(Version, 'version_id')
  },

  folder: function() {
    return this.belongsTo(Folder, 'folder_id')
  },

  versions: function() {
    return this.hasMany(Version, 'file_id').query(qb => {

      qb.orderBy('created_at', 'desc')

    })
  }

})

export default File
