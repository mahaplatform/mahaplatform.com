const RemoveFvrxDates = {

  databaseName: 'maha',

  up: async (knex) => {

    const contacts = await knex('crm_contacts')
      .whereRaw('values \\? \'lcu3wa7cou\' and values->\'lcu3wa7cou\'->>0 is not null')

    await Promise.mapSeries(contacts, async (contact) => {
      delete contact.values['lcu3wa7cou']
      delete contact.values['r7d9xuociu']
      delete contact.values['phexyhgthx']
      await knex('crm_contacts')
        .where('id', contact.id)
        .update('values', contact.values)
    })

  },

  down: async (knex) => {
  }

}

export default RemoveFvrxDates
