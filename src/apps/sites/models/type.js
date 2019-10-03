import Site from './site'
import Model from '../../../web/core/objects/model'
import Item from './item'

const Type = new Model({

  tableName: 'sites_types',

  rules: {},

  virtuals: {},

  items: function() {
    return this.hasMany(Item, 'site_id')
  },

  site: function() {
    return this.belongsTo(Site, 'site_id')
  }

})

export default Type
