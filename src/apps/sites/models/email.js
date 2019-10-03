import Model from '../../../web/core/objects/model'
import Site from './site'

const Email = new Model({

  tableName: 'sites_emails',

  rules: {},

  virtuals: {},

  site: function() {
    return this.belongsTo(Site, 'site_id')
  }

})

export default Email
