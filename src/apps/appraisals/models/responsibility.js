import ResponsibilityType from './responsibility_type'
import Model from '@core/objects/model'
import Appraisal from './appraisal'

const Responsibility = new Model({

  databaseName: 'maha',

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
