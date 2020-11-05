import Model from '@core/objects/model'
import Classification from './classification'
import Competency from './competency'
import Goal from './goal'

const Expectation = new Model ({

  tableName: 'competencies_expectations',

  classification() {
    return this.belongsTo(Classification, 'classification_id')
  },

  competency() {
    return this.belongsTo(Competency, 'competency_id')
  },

  goals() {
    return this.hasMany(Goal, 'expectation_id')
  }

})

export default Expectation
