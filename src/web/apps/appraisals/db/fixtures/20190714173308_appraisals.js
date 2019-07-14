const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('appraisals').del()

  await knex('appraisals').insert([])

}
