import Model from '../../../web/core/objects/model'
import Competency from './competency'

const Category = new Model({

  tableName: 'competencies_categories',

  rules: {
    title: 'required'
  },

  competencies() {
    return this.hasMany(Competency, 'category_id')
  }

})

export default Category
