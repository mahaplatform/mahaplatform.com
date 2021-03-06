import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Asset from '@apps/maha/models/asset'
import User from '@apps/maha/models/user'
import Access from './access'
import Folder from './folder'

const Item = new Model(knex, {

  databaseName: 'maha',

  tableName: 'drive_items',

  virtuals: {

    key() {
      return `assets/${this.get('asset_id')}/${this.get('file_name')}`
    }

  },

  accesses() {
    return this.hasMany(Access, 'code', 'code').query(qb => {
      qb.orderByRaw('access_type_id')
    })
  },

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  folder() {
    return this.belongsTo(Folder, 'folder_id')
  },

  owner() {
    return this.belongsTo(User, 'owner_id')
  }

})

export default Item
