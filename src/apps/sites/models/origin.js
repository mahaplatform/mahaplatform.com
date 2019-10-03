import Model from '../../../web/core/objects/model'
import Site from './site'

const Origin = new Model({

  tableName: 'sites_origins',

  rules: {},

  virtuals: {},

  site: function() {
    return this.belongsTo(Site, 'site_id')
  }

})

export default Origin
