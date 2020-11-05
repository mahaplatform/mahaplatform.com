import EmailActivity from '@apps/maha/models/email_activity'
import Email from '@apps/maha/models/email'
import UAParser from 'ua-parser-js'
import moment from 'moment'
import path from 'path'

const getRoot = () => {
  if(process.env.NODE_ENV === 'production') {
    return path.resolve(__dirname,'..','..','..','..','..','public')
  }
  return path.resolve(__dirname,'..','..','..','..','..','core','admin','public')
}

const root = getRoot()

const trackerFile = path.join(root,'images','tracker.png')

const openRoute = async (req, res) => {

  const ua = UAParser(req.headers['user-agent'])

  const email = await Email.where({
    code: req.params.email_code
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).send('not found')

  await email.save({
    delivered_at: email.get('delivered_at') || moment(),
    opened_at: email.get('opened_at') || moment(),
    was_delivered: true,
    was_opened: true
  }, {
    patch: true,
    transacting: req.trx
  })

  const emailActivity = await EmailActivity.query(qb => {
    qb.where('team_id', email.get('team_id'))
    qb.where('email_id', email.get('id'))
    qb.where('type', 'open')
    qb.where('created_at', '>', moment().subtract(5, 'minutes'))
  }).fetch({
    transacting: req.trx
  })

  if(!emailActivity) {
    await EmailActivity.forge({
      team_id: email.get('team_id'),
      email_id: email.get('id'),
      type: 'open',
      is_mobile: ua.device.type === 'mobile'
    }).save(null, {
      transacting: req.trx
    })
  }

  res.sendFile(trackerFile)

}

export default openRoute
