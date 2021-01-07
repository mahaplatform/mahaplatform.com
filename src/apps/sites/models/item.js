import Site from './site'
import Model from '@core/objects/model'
import Type from './type'

const Item = new Model({

  databaseName: 'maha',

  tableName: 'sites_items',

  rules: {},

  virtuals: {},

  type: function() {
    return this.belongsTo(Type, 'type_id')
  },

  site: function() {
    return this.belongsTo(Site, 'site_id')
  }

})

export default Item
