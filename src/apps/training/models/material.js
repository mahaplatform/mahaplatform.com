import Model from '@core/objects/model'
import Asset from '@apps/maha/models/asset'
import Training from './training'

const Material = new Model({

  tableName: 'training_materials',

  rules: {},

  virtuals: {},

  asset: function() {
    return this.belongsTo(Asset, 'asset_id')
  },

  training: function() {
    return this.belongsTo(Training, 'training_id')
  }

})

export default Material
