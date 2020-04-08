import { enrollInWorkflows } from '../../../../../crm/services/workflows'
import { makePayment } from '../../../../../finance/services/payments'
import generateCode from '../../../../../../core/utils/generate_code'
import socket from '../../../../../../core/services/routes/emitter'
import EmailAddress from '../../../../../crm/models/email_address'
import LineItem from '../../../../../finance/models/line_item'
import Invoice from '../../../../../finance/models/invoice'
import Registration from '../../../../models/registration'
import Contact from '../../../../../crm/models/contact'
import TicketType from '../../../../models/ticket_type'
import Ticket from '../../../../models/ticket'
import Event from '../../../../models/event'
import moment from 'moment'
import _ from 'lodash'

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

const createInvoice = async (req, { event, contact, quantities }) => {

  const code = await generateCode(req, {
    table: 'finance_invoices'
  })

  const invoice = await Invoice.forge({
    team_id: req.team.get('id'),
    code,
    program_id: event.get('program_id'),
    customer_id: contact.get('id'),
    date: moment(),
    due: moment()
  }).save(null, {
    transacting: req.trx
  })

  await Promise.map(Object.keys(quantities), async(ticket_type_id) => {

    const ticket_type = await TicketType.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('id', ticket_type_id)
    }).fetch({
      transacting: req.trx
    })

    const { quantity, base_price, price, tax_rate } = quantities[ticket_type_id]

    await LineItem.forge({
      team_id: req.team.get('id'),
      invoice_id: invoice.get('id'),
      project_id: ticket_type.get('project_id'),
      revenue_type_id: ticket_type.get('revenue_type_id'),
      // is_tax_deductible: product.get('is_tax_deductible'),
      description: `${event.get('title')} (${ticket_type.get('name')})`,
      quantity,
      price,
      tax_rate,
      base_price,
      donation: 0.00
    }).save(null, {
      transacting: req.trx
    })

  })

  return invoice

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

  const invoice = await createInvoice(req, {
    event,
    contact,
    quantities: req.body.quantities
  })

  if(req.body.payment) {
    await makePayment(req, {
      invoice,
      params: {
        merchant_id: event.get('program_id'),
        ...req.body.payment
      }
    })
  }

  const registration = await Registration.forge({
    team_id: req.team.get('id'),
    event_id: event.get('id'),
    contact_id: contact.get('id'),
    invoice_id:  invoice.get('id'),
    referer: req.body.referer,
    ipaddress: req.body.ipaddress,
    duration: parseInt(moment().format('YYYYMMDDHHmmss')) - req.body.starttime,
    is_known: contact.is_known,
    data: req.body.contact
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
      values: _.omit(ticket, ['name','ticket_type_id']),
      ticket_type_id: ticket.ticket_type_id,
      name: ticket.name
    }).save(null, {
      transacting: req.trx
    })

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
