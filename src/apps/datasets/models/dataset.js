import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Type from './type'

const Dataset = new Model(knex, {

  databaseName: 'maha',

  tableName: 'datasets_datasets',

  rules: {},

  virtuals: {},

  types() {
    return this.hasMany(Type, 'dataset_id').query(qb => {
      qb.whereNull('deleted_at')
      qb.orderBy('title', 'asc')
    })
  }

})

export default Dataset
