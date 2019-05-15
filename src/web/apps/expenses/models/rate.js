import Model from '../../../core/objects/model'

const Rate = new Model({

  belongsToTeam: false,

  hasTimestamps: false,

  tableName: 'expenses_rates',

  virtuals: {

    object_text: function() {
      return this.get('year')
    },

    object_type: function() {
      return 'rate'
    },

    object_url: function() {
      return '/admin/expenses/rates'
    }

  }

})

export default Rate
