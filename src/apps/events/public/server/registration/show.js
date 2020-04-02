import { encode } from '../../../../../core/services/jwt'
import Event from '../../../models/event'
import { readFile } from '../utils'
import path from 'path'
import ejs from 'ejs'

const showRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['image','organizers.photo','sessions.location','ticket_types','team'],
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  req.team = event.related('team')

  const template = await readFile(path.join('events','registration','index.html'))

  const content = ejs.render(template, {
    event: {
      title: event.get('title'),
      description: event.get('description'),
      image: event.related('image') ? event.related('image').get('path') : null,
      sessions: event.related('sessions').map(session => ({
        title: session.get('title'),
        location: session.related('location') ? {
          name: session.related('location').get('name'),
          address: session.related('location').get('address')
        } : null,
        is_online: session.get('is_online'),
        date: session.get('date'),
        start_time: session.get('start_time'),
        end_time: session.get('end_time')
      })),
      organizers: event.related('organizers').map(organizer => ({
        name: organizer.get('name'),
        email: organizer.get('email'),
        phone: organizer.get('phone'),
        photo: organizer.related('photo') ? organizer.related('photo').get('path') : null
      })),
      ticket_types: event.related('ticket_types').map(ticket_type => ({
        id: ticket_type.get('id'),
        name: ticket_type.get('name'),
        price_type: ticket_type.get('price_type'),
        fixed_price: ticket_type.get('fixed_price'),
        low_price: ticket_type.get('low_price'),
        high_price: ticket_type.get('high_price'),
        remaining: ticket_type.get('remaining'),
        total_tickets: ticket_type.get('total_tickets'),
        max_per_order: ticket_type.get('max_per_order'),
        sales_open_at: ticket_type.get('sales_open_at'),
        sales_close_at: ticket_type.get('sales_close_at')
      }))
    },
    token: encode({ code: event.get('code') }, 60 * 30)
  })

  res.status(200).send(content)


}

export default showRoute