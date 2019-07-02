import generateCode from '../../../../core/utils/generate_code'

const AddUserKeys = {

  up: async (knex) => {

    await knex.schema.table('maha_users', (table) => {
      table.string('key')
    })

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

export default AddUserKeys
