import Model from '../../../web/core/objects/model'
import Asset from './asset'
import Profile from './profile'

const Source = new Model({

  tableName: 'maha_sources',

  rules: {
  },

  assets() {
    return this.hasMany(Asset, 'asset_id')
  },

  profiles() {
    return this.hasMany(Profile, 'source_id')
  }

})

export default Source
