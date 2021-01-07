import Model from '@core/objects/model'
import Access from './access'

const Folder = new Model({

  databaseName: 'maha',

  tableName: 'drive_folders',

  accesses: function() {
    return this.hasMany(Access, 'code', 'code')
  },

  folder: function() {
    return this.belongsTo(Folder, 'parent_id')
  }

})

export default Folder
