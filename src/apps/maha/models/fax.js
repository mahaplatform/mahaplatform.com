import Model from '../../../core/objects/model'
import Asset from './asset'
import Number from './number'

const Fax = new Model({

  tableName: 'maha_faxes',

  rules: {},

  virtuals: {},

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  number() {
    return this.belongsTo(Number, 'number_id')
  }

})

export default Fax
