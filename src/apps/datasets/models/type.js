import Model from '@core/objects/model'
import Dataset from './dataset'
import Record from './record'

const Type = new Model({

  databaseName: 'maha',

  tableName: 'datasets_types',

  rules: {},

  virtuals: {},

  dataset() {
    return this.belongsTo(Dataset, 'dataset_id')
  },

  records() {
    return this.hasMany(Record, 'type_id')
  }

})

export default Type
