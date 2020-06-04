import { parsePhoneNumberFromString } from 'libphonenumber-js'
import User from '../../models/user'

const FixUserCellphones = {

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
