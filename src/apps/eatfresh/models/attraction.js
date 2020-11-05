import Asset from '@apps/maha/models/asset'
import Model from '@core/objects/model'
import Offering from './offering'
import Category from './category'
import County from './county'
import Photo from './photo'

const Attraction = new Model({

  tableName: 'eatfresh_attractions',

  rules: {
    title: 'required',
    address_1: 'required',
    city: 'required',
    state: 'required',
    zip: 'required',
    county_id: 'required',
    phone: 'required',
    hours_of_operation: 'required'
  },

  virtuals: {

    category_ids: function() {
      return this.related('categories').map(category => category.id)
    },

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'attraction'
    },

    object_url: function() {
      return `/eatfresh/attractions/${this.get('id')}`
    },

    offering_ids: function() {
      return this.related('offerings').map(offering => offering.id)
    }

  },

  categories() {
    return this.belongsToMany(Category, 'eatfresh_categories_attractions', 'attraction_id', 'category_id')
  },

  county() {
    return this.belongsTo(County, 'county_id')
  },

  offerings() {
    return this.belongsToMany(Offering, 'eatfresh_offerings_attractions', 'attraction_id', 'offering_id')
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  photos() {
    return this.hasMany(Photo, 'attraction_id')
  }

})

export default Attraction
