import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
import Access from './access'

const Folder = new Model({

  tableName: 'drive_folders',

  folder: function() {
    return this.belongsTo(Folder, 'parent_id')
  },

  locked_by: function() {
    return this.belongsTo(User, 'locked_by_id')
  },

  accesses: function() {
    return this.hasMany(Access, 'code', 'code')
  }

})

export default Folder
