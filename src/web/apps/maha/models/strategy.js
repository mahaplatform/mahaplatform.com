import Model from '../../../core/objects/model'

const Strategy = new Model({

  tableName: 'maha_strategies',

  rules: {
    name: 'required'
  }

})

export default Strategy
