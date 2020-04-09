import { createOrUpdateContact, handlePayment } from '../../../../../crm/services/forms'
import { enrollInWorkflows } from '../../../../../crm/services/workflows'
import generateCode from '../../../../../../core/utils/generate_code'
import socket from '../../../../../../core/services/routes/emitter'
import Registration from '../../../../models/registration'
import Ticket from '../../../../models/ticket'
import Event from '../../../../models/event'
import moment from 'moment'
import _ from 'lodash'

const getLineItems = (req, { event, quantities, ticket_types }) => {
  return Object.keys(quantities).map(id => {
    return ticket_types.find(ticket_type => {
      return ticket_type.get('id') === parseInt(id)
    })
  }).filter(ticket_type => {
    return quantities[ticket_type.get('id')].quantity > 0
  }).map(ticket_type => {
    const line_item = quantities[ticket_type.get('id')]
    const base_price = ticket_type.get('low_price') || ticket_type.get('fixed_price')
    return {
      project_id: ticket_type.get('project_id'),
      revenue_type_id: ticket_type.get('revenue_type_id'),
      donation_revenue_type_id: ticket_type.get('revenue_type_id'),
      donation: ticket_type.get('donation_revenue_type_id') ? (line_item.price - base_price) : 0.00,
      is_tax_deductible: false,
      description: `${event.get('title')}: ${ticket_type.get('name')}`,
      ...line_item
    }
  })

}

const createTickets = async (req, { registration, tickets }) => {

  await Promise.mapSeries(tickets, async(ticket) => {

    const code = await generateCode(req, {
      table: 'crm_contacts'
    })

    await Ticket.forge({
      team_id: req.team.get('id'),
      registration_id: registration.get('id'),
      code,
      values: _.omit(ticket, ['name','ticket_type_id']),
      ticket_type_id: ticket.ticket_type_id,
      name: ticket.name
    }).save(null, {
      transacting: req.trx
    })

  })

}

const submitRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['program','team','ticket_types'],
    transacting: req.trx
  })

  req.team = event.related('team')

  const fields = [
    { code: 'first_name', type: 'contactfield', contactfield: { name: 'first_name' }, overwrite: true },
    { code: 'last_name', type: 'contactfield', contactfield: { name: 'last_name' }, overwrite: true },
    { code: 'email', type: 'contactfield', contactfield: { name: 'email' }, overwrite: true },
    ...event.get('contact_config').fields
  ]

  const contact = await createOrUpdateContact(req, {
    fields,
    contactdata: req.body.contact
  })

  const line_items = getLineItems(req, {
    event,
    quantities: req.body.quantities,
    ticket_types: event.related('ticket_types')
  })

  const invoice = await handlePayment(req, {
    program: event.related('program'),
    contact,
    line_items,
    payment: req.body.payment
  })

  const registration = await Registration.forge({
    team_id: req.team.get('id'),
    event_id: event.get('id'),
    contact_id: contact.get('id'),
    invoice_id: invoice.get('id'),
    referer: req.body.referer,
    ipaddress: req.body.ipaddress,
    duration: parseInt(moment().format('YYYYMMDDHHmmss')) - req.body.starttime,
    is_known: contact.is_known,
    data: req.body.contact
  }).save(null, {
    transacting: req.trx
  })

  await createTickets(req, {
    registration,
    tickets: req.body.tickets
  })

  await enrollInWorkflows(req, {
    contact,
    trigger_type: 'event',
    event_id: event.get('id'),
    registration
  })

  await socket.refresh(req, [
    '/admin/events/events',
    `/admin/events/events/${event.get('id')}`,
    `/admin/events/events/${event.get('id')}/registrations`
  ])

  res.status(200).respond(true)

}

export default submitRoute
