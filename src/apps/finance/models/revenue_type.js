import Model from '@core/objects/model'

const RevenueType = new Model({

  belongsToTeam: false,

  tableName: 'finance_revenue_types',

  rules: {},

  virtuals: {}

})

export default RevenueType
