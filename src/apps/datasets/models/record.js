import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Type from './type'

const Record = new Model(knex, {

  databaseName: 'maha',

  tableName: 'datasets_records',

  rules: {},

  virtuals: {},

  type() {
    return this.belongsTo(Type, 'type_id')
  }

})

export default Record
