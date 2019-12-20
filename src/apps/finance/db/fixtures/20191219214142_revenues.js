const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('revenues').del()

  await knex('revenues').insert([])

}
