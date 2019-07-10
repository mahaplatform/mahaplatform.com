const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('trainings').del()

  await knex('trainings').insert([])

}
