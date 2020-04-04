import generateCode from '../../../../../../core/utils/generate_code'
import EmailAddress from '../../../../../crm/models/email_address'
import Registration from '../../../../models/registration'
import Contact from '../../../../../crm/models/contact'
import Ticket from '../../../../models/ticket'
import Event from '../../../../models/event'
import moment from 'moment'

const getContact = async (req, { data }) => {

  const email = await EmailAddress.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('address', data.email)
  }).fetch({
    withRelated: ['contact'],
    transacting: req.trx
  })

  if(email) {
    email.related('contact').is_known = true
    return email.related('contact')
  }

  const code = await generateCode(req, {
    table: 'crm_contacts'
  })

  const contact = await Contact.forge({
    team_id: req.team.get('id'),
    code
  }).save(null, {
    transacting: req.trx
  })

  contact.is_known = false

  return contact

}

const submitRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = event.related('team')

  const contact = await getContact(req, {
    data: req.body.contact
  })

  const invoice_id = null

  const registration = await Registration.forge({
    team_id: req.team.get('id'),
    event_id: event.get('id'),
    contact_id: contact.get('id'),
    invoice_id,
    referer: req.body.referer,
    ipaddress: req.body.ipaddress,
    duration: parseInt(moment().format('YYYYMMDDHHmmss')) - req.body.starttime,
    is_known: contact.is_known
  }).save(null, {
    transacting: req.trx
  })

  await Promise.mapSeries(req.body.tickets, async(ticket) => {

    const code = await generateCode(req, {
      table: 'crm_contacts'
    })

    await Ticket.forge({
      team_id: req.team.get('id'),
      registration_id: registration.get('id'),
      code,
      values: {},
      ticket_type_id: ticket.ticket_type_id,
      name: ticket.name
    }).save(null, {
      transacting: req.trx
    })

  })

  res.status(200).respond(true)

}

export default submitRoute
