import generateCode from '@core/utils/generate_code'

const AddTripCodes = {

  databaseName: 'maha',

  up: async (knex) => {

    const items = await knex('finance_items').whereNull('code')

    await Promise.mapSeries(items, async(item) => {

      const code = await generateCode({ trx: knex }, {
        table: `finance_${item.type}s`
      })

      await knex(`finance_${item.type}s`).where('id', item.item_id).update({
        code
      })

    })
    
  },

  down: async (knex) => {
  }

}

export default AddTripCodes
