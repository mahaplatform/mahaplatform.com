import Model from '../../../core/objects/model'
import Category from './category'
import Expectation from './expectation'
import Resource from './resource'

const Competency = new Model ({

  tableName: 'competencies_competencies',

  rules: {
    title: 'required',
    description: 'required',
    category_id: 'required',
    level: 'required'
  },

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'competency'
    },

    object_url: function() {
      return `/admin/competencies/competencies/${this.get('id')}`
    }

  },

  category() {
    return this.belongsTo(Category, 'category_id')
  },

  expectations() {
    return this.hasMany(Expectation, 'competencies_id')
  },

  resources() {
    return this.belongsToMany(Resource, 'competencies_competencies_resources', 'competency_id', 'resource_id')
  }

})

export default Competency
