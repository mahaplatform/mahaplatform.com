import Model from '@core/objects/model'
import Program from '@apps/crm/models/program'
import ImportItem from './import_item'
import Asset from './asset'
import User from './user'
import moment from 'moment'

const Import = new Model({

  tableName: 'maha_imports',

  rules: {},

  virtuals: {

    description: function() {
      return `by ${this.related('user').get('full_name')} on ${moment(this.get('created_at')).format('MM/DD/YY [@] h:mmA')}`
    }

  },

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  items() {
    return this.hasMany(ImportItem, 'import_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Import
