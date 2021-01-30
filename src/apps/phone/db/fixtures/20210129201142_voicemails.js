const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('voicemails').del()

  await knex('voicemails').insert([])

}
