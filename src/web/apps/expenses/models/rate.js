import Model from '../../../core/objects/model'

const Rate = new Model({

  belongsToTeam: false,

  hasTimestamps: false,

  tableName: 'expenses_rates'
  
})

export default Rate
