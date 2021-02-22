import { formatPhoneNumber, spokenPhoneNumber } from '@core/services/phone_numbers'
import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import Program from '@apps/crm/models/program'
import Model from '@core/objects/model'

const PhoneNumber = new Model({

  databaseName: 'maha',

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
      return formatPhoneNumber(this.get('number'))
    },

    spoken() {
      return spokenPhoneNumber(this.get('number'))
    }

  },

  program() {
    return this.hasOne(Program, 'phone_number_id')
  },

  voice_campaign() {
    return this.hasOne(VoiceCampaign, 'phone_number_id').query(qb => {
      qb.where('direction', 'inbound')
    })
  }

})

export default PhoneNumber
