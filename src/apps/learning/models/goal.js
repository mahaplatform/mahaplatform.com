import Model from '@core/objects/model'
import Competency from './competency'
import Plan from './plan'

const Goal = new Model({

  databaseName: 'maha',

  tableName: 'competencies_goals',

  plan() {
    return this.belongsTo(Plan, 'plan_id')
  },

  competency() {
    return this.belongsTo(Competency, 'competency_id')
  }

})

export default Goal
