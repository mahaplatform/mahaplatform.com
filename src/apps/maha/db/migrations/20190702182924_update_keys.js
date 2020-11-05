import generateCode from '@core/utils/generate_code'

const UpdateKeys = {

  up: async (knex) => {

    const users = await knex('maha_users')

    await Promise.mapSeries(users, async user => {
      await knex('maha_users').where('id', user.id).update({
        key: generateCode(32)
      })
    })

  },

  down: async (knex) => {
  }

}

export default UpdateKeys
