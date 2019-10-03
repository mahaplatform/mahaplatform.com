import Model from '../../../core/objects/model'
import Service from './service'

const Listening = new Model({

  tableName: 'maha_links',

  belongsToTeam: false,

  rules: {},

  service() {
    return this.belongsTo(Service, 'service_id')
  }

})

export default Listening
