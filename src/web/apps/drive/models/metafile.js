import Model from '../../../core/objects/model'
import User from '../../maha/models/user'
import Folder from './folder'

const MetaFile = new Model({

  tableName: 'drive_metafiles',

  folder: function() {
    return this.belongsTo(Folder, 'folder_id')
  },

  locked_by: function() {
    return this.belongsTo(User, 'locked_by_id')
  }

})

export default MetaFile
