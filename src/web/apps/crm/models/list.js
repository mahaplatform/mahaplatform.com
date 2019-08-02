import Model from '../../../core/objects/model'

const List = new Model({

  tableName: 'crm_lists',

  rules: {},

  virtuals: {},

  contacts() {
    return this.belongsToMany(List, 'crm_subscriptions', 'list_id', 'contact_id')
  }

})

export default List
