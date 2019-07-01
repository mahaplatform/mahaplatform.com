import Model from '../../../core/objects/model'
import Asset from '../../maha/models/asset'
import User from '../../maha/models/user'
import Access from './access'
import Folder from './folder'

const Item = new Model({

  tableName: 'drive_items',

  accesses: function() {
    return this.hasMany(Access, 'code', 'code').query(qb => {
      qb.orderByRaw('access_type_id')
    })
  },

  asset: function() {
    return this.belongsTo(Asset, 'asset_id')
  },

  folder: function() {
    return this.belongsTo(Folder, 'folder_id')
  },

  owner: function() {
    return this.belongsTo(User, 'owner_id')
  }

})

export default Item
