const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

const UpdateEmailAddresses = {

  up: async (knex) => {

    const nulls = await knex('maha_emails').whereRaw('"maha_emails"."to" like ?', 'null%')

    await Promise.mapSeries(nulls, async (email) => {

      const matches = email.to.match(/^null <(.*)>$/)

      if(!matches) return

      await knex('maha_emails').where('id', email.id).update({
        to: matches[1]
      })

    })

    await knex.schema.table('maha_emails', (table) => {
      table.integer('email_address_id').unsigned()
      table.foreign('email_address_id').references('crm_email_addresses.id')
    })

    const emails = await knex('maha_emails')
      .where('email_campaign_id', 1)

    await Promise.mapSeries(emails, async (email) => {

      const matches = email.to.match(EMAIL_REGEX)

      if(!matches) return

      const email_address = await knex('crm_email_addresses').whereRaw('address like ?', matches[0])

      await knex('maha_emails').where('id', email.id).update({
        email_address_id: email_address[0].id
      })

    })

    await knex.raw(`
      create view crm_email_address_bounces as
      with hard_bounces as (
      select crm_email_addresses.id as email_address_id
      from crm_email_addresses
      inner join maha_emails on maha_emails.email_address_id=crm_email_addresses.id and maha_emails.bounce_type='Permanent'
      ),
      soft_bounces as (
      select crm_email_addresses.id as email_address_id, count(maha_emails.*) as count
      from maha_emails
      inner join crm_email_addresses on crm_email_addresses.id=maha_emails.email_address_id
      where maha_emails.bounce_type='Transient'
      group by crm_email_addresses.id
      )
      select distinct on (crm_email_addresses.id) id as email_address_id,
      hard_bounces.email_address_id is not null as hard_bounce,
      coalesce(soft_bounces.count, 0) as soft_bounces
      from crm_email_addresses
      left join hard_bounces on hard_bounces.email_address_id=crm_email_addresses.id
      left join soft_bounces on soft_bounces.email_address_id=crm_email_addresses.id
    `)

  },

  down: async (knex) => {
  }

}

export default UpdateEmailAddresses
