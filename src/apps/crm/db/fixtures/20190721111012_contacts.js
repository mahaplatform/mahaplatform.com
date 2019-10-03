const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('crm_contacts').del()

  await knex('crm_contacts').insert([])

}
