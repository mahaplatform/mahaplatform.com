import Model from '@core/objects/model'
import Responsibility from './responsibility'

const ResponsibilityType = new Model({

  databaseName: 'maha',

  tableName: 'appraisals_responsibility_types',

  rules: {},

  virtuals: {},

  responsibilities() {
    return this.hasMany(Responsibility, 'responsibility_type_id')
  }

})

export default ResponsibilityType
