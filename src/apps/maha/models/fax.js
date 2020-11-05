import Model from '@core/objects/model'
import Asset from './asset'
import Number from './number'

const Fax = new Model({

  tableName: 'maha_faxes',

  rules: {},

  virtuals: {},

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  from() {
    return this.belongsTo(Number, 'from_id')
  },

  to() {
    return this.belongsTo(Number, 'to_id')
  }

})

export default Fax
