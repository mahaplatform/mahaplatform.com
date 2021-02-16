import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Model from '@core/objects/model'

const Number = new Model({

  databaseName: 'maha',

  hasTimestamps: false,

  belongsToTeam: false,

  tableName: 'maha_numbers',

  rules: {},

  virtuals: {

    formatted() {
      const phoneNumber = parsePhoneNumberFromString(this.get('number'), 'US')
      return phoneNumber.formatNational().replace(/\s/,'-').replace(/[()]/g, '')
    }

  }

})

export default Number
