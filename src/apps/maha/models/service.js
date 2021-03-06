import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Attachment from './attachment'

const Service = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_services',
  
  belongsToTeam: false,

  hasTimestamps: false,

  attachments() {
    return this.hasMany(Attachment, 'service_id')
  }

})

export default Service
