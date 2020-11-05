import EmailAddress from '../../models/email_address'
import Email from '@apps/maha/models/email'

const AddEmailAddressToEmails = {

  up: async (knex) => {

    const emails = await Email.query(qb => {
      qb.whereNotNull('email_id')
    }).fetchAll({
      transacting: knex
    })

    await Promise.mapSeries(emails, async (email) => {

      const to = email.get('to').match(/<(.*)>/)

      const email_address = await EmailAddress.query(qb => {
        qb.where('address', to[1].toLowerCase())
      }).fetch({
        transacting: knex
      })

      if(!email_address) return

      await email.save({
        email_address_id: email_address.get('id')
      }, {
        transacting: knex
      })

    })

  },

  down: async (knex) => {
  }

}

export default AddEmailAddressToEmails
