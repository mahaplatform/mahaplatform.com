import Model from '../../../web/core/objects/model'
import Attachment from './attachment'

const Service = new Model({

  tableName: 'maha_services',
  
  belongsToTeam: false,

  hasTimestamps: false,

  attachments() {
    return this.hasMany(Attachment, 'service_id')
  }

})

export default Service
