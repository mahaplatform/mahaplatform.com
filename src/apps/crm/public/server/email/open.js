import EmailActivity from '../../../models/email_activity'
import Email from '../../../models/email'
import moment from 'moment'
import path from 'path'

const trackerFile = path.resolve(__dirname,'..','..','..','..','..','public','images','tracker.png')

const openRoute = async (req, res) => {

  const email = await Email.where({
    code: req.params.email_code
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).send('not found')

  await email.save({
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

  if(!emailActivity) await EmailActivity.forge({
    team_id: email.get('team_id'),
    email_id: email.get('id'),
    type: 'open'
  }).save(null, {
    transacting: req.trx
  })

  res.sendFile(trackerFile)

}

export default openRoute
