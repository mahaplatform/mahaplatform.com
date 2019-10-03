import Origin from './origin'
import Model from '../../../web/core/objects/model'
import Type from './type'

const Site = new Model({

  tableName: 'sites_sites',

  rules: {},

  virtuals: {},

  origins: function() {
    return this.hasMany(Origin, 'site_id')
  },

  types: function() {
    return this.hasMany(Type, 'site_id')
  }

})

export default Site
