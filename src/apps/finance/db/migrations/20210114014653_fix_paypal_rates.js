import { updateRates } from '@apps/finance/services/payments/update_rates'

const FixPaypalRates = {

  databaseName: 'maha',

  up: async (trx) => {

    await Promise.mapSeries([1476,1500,1508,1509,1510], async (payment_id) => {
      await updateRates({ trx }, {
        payment_id,
        rate: 0.0290,
        cross_border_rate: 0.000
      })
    })

  },

  down: async (knex) => {
  }

}

export default FixPaypalRates
