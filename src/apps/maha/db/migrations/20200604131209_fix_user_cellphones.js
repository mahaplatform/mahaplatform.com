import { parsePhoneNumberFromString } from 'libphonenumber-js'
import User from '@apps/maha/models/user'

const FixUserCellphones = {

  databaseName: 'maha',

  up: async (knex) => {

    const users = await User.query(qb => {
      qb.whereNotNull('cell_phone')
    }).fetchAll({
      transacting: knex
    })


    await Promise.mapSeries(users, async (user) => {
      const number = parsePhoneNumberFromString(user.get('cell_phone'), 'US')
      user.save({
        cell_phone: number.number
      }, {
        transacting: knex
      })
    })

  },

  down: async (knex) => {
  }

}

export default FixUserCellphones
