import Model from '../../../web/core/objects/model'
import Asset from './asset'
import ImportItem from './import_item'
import User from './user'
import moment from 'moment'

const Import = new Model({

  tableName: 'maha_imports',

  rules: {
    asset_id: ['required']
  },

  virtuals: {

    description: function() {
      if(this.get('name')) return this.get('name')
      if(this.get('asset_id')) return this.related('asset').get('original_file_name')
      return `Import on ${moment(this.get('created_at')).format('MM/DD/YYYY')}`
    }

  },

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  items() {
    return this.hasMany(ImportItem, 'import_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Import
