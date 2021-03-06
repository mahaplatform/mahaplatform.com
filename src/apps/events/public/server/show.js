import Setting from '@apps/platform/models/setting'
import { encode } from '@core/services/jwt'
import Event from '@apps/events/models/event'
import { readFile } from './utils'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const settings = await Setting.query(qb => {
    qb.where('id', 1)
  }).fetch({
    transacting: req.trx
  })

  const event = await Event.query(qb => {
    qb.where('code', req.params.code)
    qb.whereNull('deleted_at')
  }).fetch({
    withRelated: ['image','organizers.photo','program.logo','program.fields','program.bank','sessions.location','ticket_types','team.logo'],
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  req.team = event.related('team')

  const template = await readFile(path.join('events','registration','index.html'))

  const ipaddress = req.header('x-forwarded-for') || req.connection.remoteAddress

  const program = event.related('program')

  const content = ejs.render(template, {
    event: {
      id: event.get('id'),
      starttime: parseInt(moment().format('YYYYMMDDHHmmss')),
      referer: req.header('referer'),
      ipaddress: ipaddress.replace(/\s/,'').split(',').shift(),
      code: event.get('code'),
      title: event.get('title'),
      description: event.get('description'),
      image: event.related('image') ? event.related('image').get('path') : null,
      url: event.get('url'),
      settings: {
        card_enabled: true,
        ach_enabled: program.related('bank').get('has_ach'),
        googlepay_enabled: settings.get('values').googlepay_enabled,
        paypal_enabled: program.related('bank').get('has_paypal'),
        applepay_enabled: true,
        door_enabled: event.get('payment_config').pay_at_door
      },
      sessions: event.related('sessions').map(session => ({
        title: session.get('title'),
        description: session.get('description'),
        location: session.related('location') ? {
          name: session.related('location').get('name'),
          address: session.related('location').get('address')
        } : null,
        is_online: session.get('is_online'),
        starts_at: session.get('starts_at'),
        ends_at: session.get('ends_at')
      })),
      organizers: event.related('organizers').map(organizer => ({
        name: organizer.get('name'),
        email: organizer.get('email'),
        phone: organizer.get('phone'),
        photo: organizer.related('photo') ? organizer.related('photo').get('path') : null
      })),
      program: {
        title: program.get('title'),
        logo: program.related('logo') ? program.related('logo').get('path') : null
      },
      ticket_types: event.related('ticket_types').filter(ticket_type => {
        const sales_open = !ticket_type.get('sales_open_at') || moment().diff(moment(ticket_type.get('sales_open_at'))) > 0
        const sales_closed = ticket_type.get('sales_close_at') && moment().diff(moment(ticket_type.get('sales_close_at'))) > 0
        return sales_open && !sales_closed && ticket_type.get('is_active')
      }).map(ticket_type => ({
        id: ticket_type.get('id'),
        name: ticket_type.get('name'),
        code: ticket_type.get('code'),
        description: ticket_type.get('description'),
        price_type: ticket_type.get('price_type'),
        fixed_price: ticket_type.get('fixed_price'),
        low_price: ticket_type.get('low_price'),
        high_price: ticket_type.get('high_price'),
        tax_rate: ticket_type.get('tax_rate'),
        remaining: ticket_type.get('remaining'),
        total_tickets: ticket_type.get('total_tickets'),
        max_per_order: ticket_type.get('max_per_order'),
        sales_open_at: ticket_type.get('sales_open_at'),
        sales_close_at: ticket_type.get('sales_close_at')
      })),
      contact_config: {
        fields: event.get('contact_config').fields.map(field => {
          if(!field.contactfield) return field
          const programfield = program.related('fields').find(programfield => {
            return programfield.get('code') === field.contactfield.code
          })
          return {
            ...field,
            ...programfield ? {
              config: programfield.get('config')
            } : {}
          }
        })
      },
      ticket_config: event.get('ticket_config'),
      payment_config: event.get('payment_config')
    },
    program: {
      title: program.get('title'),
      logo: program.related('logo') ? program.related('logo').get('path') : null
    },
    team: {
      title: req.team.get('title'),
      logo: req.team.related('logo') ? req.team.related('logo').get('path') : null
    },
    token: encode({ code: event.get('code') }, 60 * 60 * 2)
  })

  res.status(200).send(content)

}

export default showRoute
