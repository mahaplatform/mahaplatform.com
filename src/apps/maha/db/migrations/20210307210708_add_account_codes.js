import generateCode from '@core/utils/generate_code'

const AddAccountCodes = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.alterTable('maha_accounts', function(table) {
      table.string('code')
    })

    const accounts = await knex('maha_accounts')

    await Promise.mapSeries(accounts, async (account) => {

      const code = await generateCode({ trx: knex }, {
        table: 'maha_accounts'
      })

      await knex('maha_accounts').where('id', account.id).update({
        code
      })

    })

  },

  down: async (knex) => {
  }

}

export default AddAccountCodes
