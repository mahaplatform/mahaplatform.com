import Model from '@core/objects/model'
import Dataset from './dataset'
import Item from './item'

const Type = new Model({

  databaseName: 'maha',

  tableName: 'datasets_types',

  rules: {},

  virtuals: {},

  dataset() {
    return this.belongsTo(Dataset, 'dataset_id')
  },

  items() {
    return this.hasMany(Item, 'type_id')
  }

})

export default Type
