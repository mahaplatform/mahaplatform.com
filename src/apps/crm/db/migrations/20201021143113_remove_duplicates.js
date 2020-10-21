import _ from 'lodash'

const RemoveDuplicates = {

  up: async (knex) => {

    const emails = await knex.raw(`
      select e1.id as e1_id,
      e1.address as e1_address,
      e2.id as e2_id,
      e2.address as e2_address
      from crm_email_addresses e1
      left join crm_email_addresses e2 on e2.contact_id=e1.contact_id and e2.address=e1.address and e1.team_id = e2.team_id and e1.id != e2.id
      where e2.id is not null
    `).then(result => result.rows)

    await Promise.reduce(emails, async(keeps, email_address) => {
      if(_.includes(keeps, email_address.e2_id)) return keeps
      await knex('crm_consents').where('email_address_id', email_address.e2_id).del()
      await knex('crm_email_addresses').where('id', email_address.e2_id).del()
      return [
        ...keeps,
        email_address.e1_id
      ]
    }, [])

    const numbers = await knex.raw(`
      select e1.id as e1_id,
      e1.number as e1_number,
      e2.id as e2_id,
      e2.number as e2_number
      from crm_phone_numbers e1
      left join crm_phone_numbers e2 on e2.contact_id=e1.contact_id and e2.number=e1.number and e1.team_id = e2.team_id and e1.id != e2.id
      where e2.id is not null
    `).then(result => result.rows)

    await Promise.reduce(numbers, async(keeps, phone_number) => {
      if(_.includes(keeps, phone_number.e2_id)) return keeps
      await knex('crm_consents').where('phone_number_id', phone_number.e2_id).del()
      await knex('crm_phone_numbers').where('id', phone_number.e2_id).del()
      return [
        ...keeps,
        phone_number.e1_id
      ]
    }, [2386, 2387])

    const empties = await knex.raw(`
      select *
      from crm_email_addresses
      where address is null or address = ''
    `).then(result => result.rows)

    await Promise.mapSeries(empties, async(email_address) => {
      await knex('crm_email_addresses').where('id', email_address.id).del()
    })

  },

  down: async (knex) => {
  }

}

export default RemoveDuplicates
