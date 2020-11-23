import Model from '@core/objects/model'

const RevenueType = new Model({

  belongsToTeam: false,

  tableName: 'finance_revenue_types',

  rules: {},

  virtuals: {

    display: function() {
      return `${this.get('integration').revenue_code} - ${this.get('title')}`
    }

  }

})

export default RevenueType
