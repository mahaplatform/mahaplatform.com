import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import User from '@apps/maha/models/user'
import Version from './version'
import Access from './access'
import Folder from './folder'

const File = new Model(knex, {

  databaseName: 'maha',

  tableName: 'drive_files',

  accesses: function() {
    return this.hasMany(Access, 'code', 'code')
  },

  current_version: function() {
    return this.belongsTo(Version, 'version_id')
  },

  folder: function() {
    return this.belongsTo(Folder, 'folder_id')
  },

  owner: function() {
    return this.belongsTo(User, 'owner_id')
  },

  versions: function() {
    return this.hasMany(Version, 'file_id').query(qb => {
      qb.orderBy('created_at', 'desc')
    })
  }

})

export default File
