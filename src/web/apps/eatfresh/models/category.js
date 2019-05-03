import Asset from '../../maha/models/asset'
import Model from '../../../core/objects/model'
import Attraction from './attraction'

const Category = new Model({

  tableName: 'eatfresh_categories',

  rules: {
    title: 'required'
  },

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'category'
    },

    object_url: function() {
      return `/admin/eatfresh/categories/${this.get('id')}`
    }

  },

  attractions() {
    return this.belongsToMany(Attraction, 'category_id')
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  }

})

export default Category
