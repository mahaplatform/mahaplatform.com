import Model from '@core/objects/model'
import Expectation from './expectation'

const Classificiation = new Model({

  databaseName: 'maha',

  tableName: 'competencies_classifications',

  rules: {
    title: 'required'
  },

  expectations() {
    return this.hasMany(Expectation, 'classification_id')
  }

})

export default Classificiation
