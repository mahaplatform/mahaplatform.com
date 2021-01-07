import Model from '@core/objects/model'
import Assignment from './assignment'
import Material from './material'
import Offering from './offering'
import Lesson from './lesson'
import Quiz from './quiz'

const Training = new Model({

  databaseName: 'maha',

  tableName: 'training_trainings',

  rules: {},

  virtuals: {

    asset_ids() {
      return this.related('materials').map(material => {
        return material.get('asset_id')
      })
    }
  },

  assignments() {
    return this.hasMany(Assignment, 'training_id')
  },

  lessons() {
    return this.hasMany(Lesson, 'training_id')
  },

  materials() {
    return this.hasMany(Material, 'training_id')
  },

  offerings() {
    return this.belongsTo(Offering, 'training_id')
  },

  quiz() {
    return this.hasOne(Quiz, 'training_id')
  }

})

export default Training
