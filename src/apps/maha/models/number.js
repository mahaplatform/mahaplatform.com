import { formatPhoneNumber } from '@core/services/phone_numbers'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Number = new Model(knex, {

  databaseName: 'maha',

  hasTimestamps: false,

  belongsToTeam: false,

  tableName: 'maha_numbers',

  rules: {},

  virtuals: {

    formatted() {
      return formatPhoneNumber(this.get('number'))
    }

  }

})

export default Number
