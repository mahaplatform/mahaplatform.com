import Model from '../../../web/core/objects/model'
import Responsibility from './responsibility'

const ResponsibilityType = new Model({

  tableName: 'appraisals_responsibility_types',

  rules: {},

  virtuals: {},

  responsibilities() {
    return this.hasMany(Responsibility, 'responsibility_type_id')
  }

})

export default ResponsibilityType
