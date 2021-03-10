import moment from 'moment'

const RemoveShortPhoneNumbers = {

  databaseName: 'maha',

  up: async (knex) => {

    const numbers = await knex('crm_phone_numbers').whereRaw('length(number) < 12')

    await Promise.mapSeries(numbers, async(number) => {
      await knex('crm_phone_numbers').where('id', number.id).update({
        deleted_at: moment()
      })
    })
  },

  down: async (knex) => {
  }

}

export default RemoveShortPhoneNumbers
