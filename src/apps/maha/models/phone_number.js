import { parsePhoneNumberFromString } from 'libphonenumber-js'
import VoiceCampaign from '../../campaigns/models/voice_campaign'
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
      return `/team/phone_numbers/${this.get('id')}`
    },

    formatted() {
      const phoneNumber = parsePhoneNumberFromString(this.get('number'), 'US')
      return phoneNumber.formatNational()
    },

    spoken() {
      const phoneNumber = parsePhoneNumberFromString(this.get('number'), 'US')
      const parts = []
      parts.push('area code')
      parts.push(phoneNumber.nationalNumber.split('').join(' '))
      if(!phoneNumber.ext) return parts.join(' ')
      parts.push('extension')
      parts.push(phoneNumber.ext.split('').join(' '))
      return parts.join(' ')
    }

  },

  program() {
    return this.hasOne(Program, 'phone_number_id')
  },

  voice_campaigns() {
    return this.hasMany(VoiceCampaign, 'phone_number_id')
  }

})

export default PhoneNumber
