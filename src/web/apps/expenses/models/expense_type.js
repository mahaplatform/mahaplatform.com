import Model from '../../../core/objects/model'

const ExpenseType = new Model({

  tableName: 'expenses_expense_types',

  rules: {
    title: 'required'
  },

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'expense type'
    },

    object_url: function() {
      return `/admin/expenses/expense_types/${this.get('id')}`
    }

  }

})

export default ExpenseType
