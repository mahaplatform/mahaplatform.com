import Asset from '../../maha/models/asset'
import Model from '@core/objects/model'
import Category from './category'
import Attraction from './attraction'

const Offering = new Model({

  tableName: 'eatfresh_offerings' ,

  rules: {
    title: 'required'
  },

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'offering'
    },

    object_url: function() {
      return `/eatfresh/offerings/${this.get('id')}`
    }

  },

  category() {
    return this.belongsToMany(Category, 'category_id')
  },

  attractions() {
    return this.belongsToMany(Attraction, 'offering_id')
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  }


})

export default Offering
