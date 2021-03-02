import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const AccessType = new Model(knex, {

  databaseName: 'maha',

  tableName: 'drive_access_types'
  
})

export default AccessType
