import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Certificate = new Model(knex, {

  databaseName: 'maha',

  tableName: 'websites_certificates',

  rules: {},

  virtuals: {}

})

export default Certificate
