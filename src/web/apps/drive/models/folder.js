import Model from '../../../core/objects/model'
import Access from './access'

const Folder = new Model({

  tableName: 'drive_folders',

  folder: function() {
    return this.belongsTo(Folder, 'parent_id')
  },

  accesses: function() {
    return this.hasMany(Access, 'code', 'code')
  }

})

export default Folder
