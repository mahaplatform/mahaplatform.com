const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('quizzes').del()

  await knex('quizzes').insert([])

}
