const FixPrimaryEmailAddresses = {

  up: async (knex) => {

    const emails = await knex.raw(`
      select e1.id
      from crm_contacts
      left join crm_email_addresses e1 on e1.contact_id=crm_contacts.id
      left join crm_email_addresses e2 on e2.contact_id=crm_contacts.id and e2.is_primary=true
      where e1.id is not null and e2.id is null
    `)

    await Promise.mapSeries(emails.rows, async (email) => {
      await knex('crm_email_addresses').where('id', email.id).update({
        is_primary: true
      })
    })

  },

  down: async (knex) => {
  }

}

export default FixPrimaryEmailAddresses
