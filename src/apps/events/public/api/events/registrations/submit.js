import { createOrUpdateContact, createInvoice, handlePayment } from '@apps/forms/services/forms'
import { enrollInWorkflows } from '@apps/automation/services/workflows'
import { checkToken } from '@core/services/routes/checks'
import { contactActivity } from '@apps/crm/services/activities'
import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'
import Registration from '@apps/events/models/registration'
import Ticket from '@apps/events/models/ticket'
import Event from '@apps/events/models/event'
import moment from 'moment'
import _ from 'lodash'

const getLineItems = (req, { event, quantities, ticket_types }) => {
  return Object.keys(quantities).map(id => {
    return ticket_types.find(ticket_type => {
      return ticket_type.get('id') === parseInt(id)
    })
  }).filter(ticket_type => {
    const { price, quantity } = quantities[ticket_type.get('id')]
    return price !== null && quantity > 0
  }).map(ticket_type => {
    const line_item = quantities[ticket_type.get('id')]
    return {
      project_id: ticket_type.get('project_id'),
      donation_revenue_type_id: ticket_type.get('donation_revenue_type_id'),
      overage_strategy: ticket_type.get('overage_strategy'),
      revenue_type_id: ticket_type.get('revenue_type_id'),
      price_type: ticket_type.get('price_type'),
      fixed_price: ticket_type.get('fixed_price'),
      low_price: ticket_type.get('low_price'),
      high_price: ticket_type.get('high_price'),
      tax_rate: ticket_type.get('tax_rate'),
      is_tax_deductible: ticket_type.get('is_tax_deductible'),
      description: `${event.get('title')}: ${ticket_type.get('name')}`,
      quantity: line_item.quantity,
      price: line_item.price
    }
  })
}

const getInvoice = async (req, { program_id, contact, line_items }) => {

  return await createInvoice(req, {
    program_id,
    contact,
    line_items
  })

}

const createTickets = async (req, { registration, tickets }) => {

  await Promise.mapSeries(tickets, async(ticket) => {

    const code = await generateCode(req, {
      table: 'events_tickets'
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

  if(!checkToken(req.headers.authorization, req.params.code)) {
    return res.status(401).send('Unauthorized')
  }

  const event = await Event.query(qb => {
    qb.where('code', req.params.code)
    qb.whereNull('deleted_at')
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
    program: event.related('program'),
    data: req.body.contact
  })

  const line_items = getLineItems(req, {
    event,
    quantities: req.body.quantities,
    ticket_types: event.related('ticket_types')
  })

  const total = line_items.reduce((total, line_item) => {
    return total + (Number(line_item.quantity) * Number(line_item.price))
  }, 0.00)

  const invoice = total > 0 ? await getInvoice(req, {
    program_id: event.get('program_id'),
    contact,
    line_items
  }) : null

  const payment = req.body.payment ? await handlePayment(req, {
    invoice,
    program: event.related('program'),
    payment: req.body.payment
  }) : null

  const registration = await Registration.forge({
    team_id: req.team.get('id'),
    event_id: event.get('id'),
    contact_id: contact.get('id'),
    invoice_id: invoice ? invoice.get('id') : null,
    payment_id: payment ? payment.get('id') : null,
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
    trigger_type: 'registration_created',
    event_id: event.get('id'),
    registration
  })

  await contactActivity(req, {
    contact,
    type: 'registration',
    story: 'registered for an event',
    program_id: event.get('program_id'),
    data: {
      event_id: event.get('id'),
      registration_id: registration.get('id')
    }
  })

  await socket.refresh(req, [
    '/admin/events/events',
    `/admin/events/events/${event.get('id')}`,
    `/admin/events/events/${event.get('id')}/registrations`
  ])

  await res.status(200).respond(registration, (req, registration) => ({
    registration_id: registration.get('id'),
    contact_id: registration.get('contact_id')
  }))

}

export default submitRoute
