import Model from '@core/objects/model'
import Site from './site'

const Origin = new Model({

  databaseName: 'maha',

  tableName: 'sites_origins',

  rules: {},

  virtuals: {},

  site: function() {
    return this.belongsTo(Site, 'site_id')
  }

})

export default Origin
