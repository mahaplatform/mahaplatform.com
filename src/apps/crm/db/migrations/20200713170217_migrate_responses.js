import Response from '@apps/crm/models/response'
import _ from 'lodash'

const MigrateResponses = {

  up: async (knex) => {
    const responses = await Response.query(qb => {
      qb.whereNotNull('invoice_id')
    }).fetchAll({
      transacting: knex
    })
    await Promise.map(responses, async(response) => {
      const data = response.get('data')
      const newdata = Object.keys(data).reduce((newdata, key) => ({
        ...newdata,
        [key]: _.isPlainObject(data[key]) && data[key].products ? _.omit({
          ...data[key],
          line_items: data[key].products
        }, ['products']) : data[key]
      }), {})
      await response.save({
        data: newdata
      }, {
        transacting: knex,
        patch: true

      })
    })
  },

  down: async (knex) => {
  }

}

export default MigrateResponses
