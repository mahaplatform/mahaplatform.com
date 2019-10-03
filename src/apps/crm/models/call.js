import Model from '../../../web/core/objects/model'
import Contact from './contact'

const Call = new Model({

  tableName: 'crm_calls',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  }

})

export default Call
