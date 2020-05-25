import Event from '../../models/event'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const icsRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('code', req.params.code)
    qb.whereNull('deleted_at')
  }).fetch({
    withRelated: ['program','sessions.location','team'],
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  req.team = event.related('team')

  const template = fs.readFileSync(path.join(__dirname, 'ics.ejs'), 'utf8')

  const content = ejs.render(template, {
    moment,
    event,
    program: event.related('program')
  })

  res.header('Content-Disposition', 'attachment; filename=event.ics')

  res.header('Content-type', 'text/calendar; charset=utf-8')

  res.status(200).type('text/calendar').send(content)

}

export default icsRoute
