import Ticket from '../../../models/ticket'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const showRoute = async (req, res) => {

  const ticket = await Ticket.query(qb => {
    qb.innerJoin('events_registrations','events_registrations.id','events_tickets.registration_id')
    qb.innerJoin('events_events','events_events.id','events_registrations.event_id')
    qb.where('events_events.code', req.params.event_code)
    qb.where('events_tickets.code', req.params.code)
  }).fetch({
    withRelated: ['registration.event.image', 'registration.event.sessions', 'registration.event.program.logo'],
    transacting: req. trx
  })

  if(!ticket) return res.status(404).respond({
    code: 404,
    message: 'Unable to load ticket'
  })

  const template = fs.readFileSync(path.join(__dirname, 'show.ejs'), 'utf8')

  const event = ticket.related('registration').related('event')

  const content = ejs.render(template, {
    moment,
    event: {
      image: event.related('image') ? event.related('image').get('path') : null,
      title: event.get('title')
    },
    sessions: event.related('sessions').map(session => ({
      date: session.get('date'),
      start_time: session.get('start_time'),
      end_time: session.get('end_time')
    })),
    ticket: {
      code: ticket.get('code'),
      name: ticket.get('name')
    }
  })

  res.status(200).type('text/html').send(content)

}

export default showRoute
