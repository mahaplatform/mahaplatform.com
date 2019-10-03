import Model from '../../../core/objects/model'
import Attraction from './attraction'

const County = new Model({

  tableName: 'eatfresh_counties',

  rules: {
    name: ['required']
  },

  virtuals: {

    object_text: function() {
      return this.get('name')
    },

    object_type: function() {
      return 'county'
    },

    object_url: function() {
      return `/admin/eatfresh/counties/${this.get('id')}`
    }

  },

  attractions() {
    return this.hasMany(Attraction, 'count_id')
  }

})

export default County
