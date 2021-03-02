import Grouping from '@apps/maha/models/grouping'
import Group from '@apps/maha/models/group'
import User from '@apps/maha/models/user'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Dataset from './dataset'

const DatasetAccess = new Model(knex, {

  databaseName: 'maha',

  tableName: 'datasets_dataset_accesses',

  rules: {},

  virtuals: {},

  dataset() {
    return this.belongsTo(Dataset, 'dataset_id')
  },

  grouping() {
    return this.belongsTo(Grouping, 'grouping_id')
  },

  group() {
    return this.belongsTo(Group, 'group_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default DatasetAccess
