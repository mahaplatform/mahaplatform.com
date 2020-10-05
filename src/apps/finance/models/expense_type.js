import Model from '../../../core/objects/model'

const ExpenseType = new Model({

  belongsToTeam: false,

  tableName: 'finance_expense_types',

  rules: {
    title: 'required'
  },

  virtuals: {

    display: function() {
      return `${this.get('integration').expense_code} - ${this.get('title')}`
    },

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'expense type'
    },

    object_url: function() {
      return `/admin/finance/expense_types/${this.get('id')}`
    }

  }

})

export default ExpenseType
