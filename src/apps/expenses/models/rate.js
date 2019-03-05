import { Model } from 'maha'

const Rate = new Model({

  belongsToTeam: false,

  hasTimestamps: false,

  tableName: 'expenses_rates'
  
})

export default Rate
