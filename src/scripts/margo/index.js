import '../../core/services/environment'
import { updateEmailAddresses } from '../../apps/crm/services/email_addresses'
import { enrollInWorkflows } from '../../apps/crm/services/workflows'
import Registration from '../../apps/events/models/registration'
import EmailAddress from '../../apps/crm/models/email_address'
import generateCode from '../../core/utils/generate_code'
import Ticket from '../../apps/events/models/ticket'
import Contact from '../../apps/crm/models/contact'
import Team from '../../apps/maha/models/team'
import knex from '../../core/services/knex'
import csvparse from 'csv-parse/lib/sync'
import path from 'path'
import fs from 'fs'

const ticket_types = {
  4: 18,
  3: 15,
  2: 12
}

const getContact = async (req, { row }) => {

  const email = await EmailAddress.query(qb => {
    qb.where('address', row[4])
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(email) return email.related('contact')

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: 1,
    code,
    first_name: row[0],
    last_name: row[1]
  }).save(null, {
    transacting: req.trx
  })

  await updateEmailAddresses(req, {
    contact,
    email_addresses: [
      { address: row[4], is_primary: true }
    ]
  })

  return contact

}

const margo = async () => {

  const data = fs.readFileSync(path.join(__dirname,'registrations.tsv'))

  const rows = csvparse(data, {
    delimiter: "\t"
  })

  await knex.transaction(async trx => {

    const req = { trx }

    req.team = await Team.query(qb => {
      qb.where('id', 1)
    }).fetch({
      transacting: req.trx
    })

    await Promise.map(rows.slice(1), async(row) => {
      if(!row[4]) return

      const contact = await getContact(req, {
        row
      })

      await Promise.map([2,3,4], async(event_id) => {

        const registration = await Registration.forge({
          team_id: req.team.get('id'),
          event_id,
          contact_id: contact.get('id'),
          invoice_id: null,
          referer: null,
          ipaddress: null,
          duration: 0,
          is_known: false,
          data: {
            first_name: row[0],
            last_name: row[1],
            email: row[4],
            osdvvatocd: row[2],
            vaattsoacd: row[3]
          }
        }).save(null, {
          transacting: req.trx
        })

        const code = await generateCode(req, {
          table: 'events_tickets'
        })

        await Ticket.forge({
          team_id: req.team.get('id'),
          registration_id: registration.get('id'),
          code,
          values: {},
          ticket_type_id: ticket_types[event_id],
          name: `${row[0]} ${row[1]}`
        }).save(null, {
          transacting: req.trx
        })

        await enrollInWorkflows(req, {
          contact,
          trigger_type: 'event',
          event_id,
          registration
        })

      })

    })

  }).catch(err => {
    console.log(err)
  })

}

margo().then(process.exit)
