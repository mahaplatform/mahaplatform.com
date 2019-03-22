import { Model } from 'maha'
import Expectation from './expectation'

const Classificiation = new Model({

  tableName: 'competencies_classifications',

  rules: {
    title: 'required'
  },

  expectations() {
    return this.hasMany(Expectation, 'classification_id')
  }

})

export default Classificiation
