import Model from '@core/objects/model'
import Competency from './competency'

const Category = new Model({

  databaseName: 'maha',

  tableName: 'competencies_categories',

  rules: {
    title: 'required'
  },

  competencies() {
    return this.hasMany(Competency, 'category_id')
  }

})

export default Category
