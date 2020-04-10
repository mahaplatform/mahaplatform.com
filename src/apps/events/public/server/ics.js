import Event from '../../models/event'
import moment from 'moment'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const icsRoute = async (req, res) => {

  const event = await Event.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['program','sessions.location'],
    transacting: req.trx
  })

  if(!event) return res.status(404).respond({
    code: 404,
    message: 'Unable to load event'
  })

  const template = fs.readFileSync(path.join(__dirname, 'ics.ejs'), 'utf8')

  const content = ejs.render(template, {
    moment,
    event,
    program: event.related('program')
  })

  res.status(200).type('text/html').send(content)

}

export default icsRoute
