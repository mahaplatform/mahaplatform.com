import Model from '../../../core/objects/model'
import Contact from './contact'

const Note = new Model({

  tableName: 'crm_notes',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  }

})

export default Note
