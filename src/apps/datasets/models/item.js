import Model from '@core/objects/model'
import Type from './type'

const Item = new Model({

  databaseName: 'maha',

  tableName: 'datasets_items',

  rules: {},

  virtuals: {},

  type() {
    return this.belongsTo(Type, 'type_id')
  }

})

export default Item
