import Model from '../../../core/objects/model'
import Program from '../../crm/models/program'

const PhoneNumber = new Model({

  tableName: 'maha_phone_numbers',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('formatted')
    },

    object_type: function() {
      return 'phone number'
    },

    object_url: function() {
      return `/admin/team/phone_numbers/${this.get('id')}`
    },

    formatted() {
      const parts = this.get('number').match(/\+1(\d{3})(\d{3})(\d{4})/)
      return `(${parts[1]}) ${parts[2]}-${parts[3]}`
    }

  },

  program() {
    return this.hasOne(Program, 'phone_number_id')
  }

})

export default PhoneNumber
