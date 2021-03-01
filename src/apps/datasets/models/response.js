import Contact from '@apps/crm/models/contact'
import Model from '@core/objects/model'
import Record from './record'
import Type from './type'

const Response = new Model({

  databaseName: 'maha',

  tableName: 'datasets_responses',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  type() {
    return this.belongsTo(Type, 'type_id')
  },

  record() {
    return this.belongsTo(Record, 'record_id')
  }

})

export default Response
