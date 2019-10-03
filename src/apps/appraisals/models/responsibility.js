import ResponsibilityType from './responsibility_type'
import Model from '../../../web/core/objects/model'
import Appraisal from './appraisal'

const Responsibility = new Model({

  tableName: 'appraisals_responsibilities',

  rules: {},

  virtuals: {},

  appraisal() {
    return this.belongsTo(Appraisal, 'appraisal_id')
  },

  responsibility_type() {
    return this.belongsTo(ResponsibilityType, 'responsibility_type_id')
  }

})

export default Responsibility
