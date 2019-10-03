const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('crm_organizations').del()

  await knex('crm_organizations').insert([])

}
