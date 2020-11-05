import Model from '@core/objects/model'
import Plan from './plan'
import Resource from './resource'

const Commitment = new Model ({

  tableName: 'competencies_commitments',

  plan() {
    return this.belongsTo(Plan, 'plan_id')
  },

  resource() {
    return this.belongsTo(Resource, 'resource_id')
  }

})

export default Commitment
