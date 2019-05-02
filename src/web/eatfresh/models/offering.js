import { Asset, Model } from 'maha'
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
      return `/admin/eatfresh/offerings/${this.get('id')}`
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
