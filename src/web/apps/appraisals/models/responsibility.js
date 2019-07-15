import Model from '../../../core/objects/model'
import Appraisal from './appraisal'

const Responsibility = new Model({

  tableName: 'appraisals_responsibilities',

  rules: {},

  virtuals: {},

  appraisal() {
    return this.belongsTo(Appraisal, 'appraisal_id')
  }

})

export default Responsibility
