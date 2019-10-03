import EmailActivity from '../../../../apps/maha/models/email_activity'
import Email from '../../../../apps/maha/models/email'
import moment from 'moment'
import path from 'path'

const trackerFile = path.resolve(__dirname,'..','..','..','admin','public','images','tracker.png')

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

  const activityData = {
    team_id: email.get('team_id'),
    email_id: email.get('id'),
    type: 'open'
  }

  const emailActivity = await EmailActivity.where(activityData).query(qb => {
    qb.where('created_at', '>', moment().subtract(5, 'minutes'))
  }).fetch({
    transacting: req.trx
  })

  if(!emailActivity) await EmailActivity.forge(activityData).save(null, {
    transacting: req.trx
  })

  res.sendFile(trackerFile)

}

export default openRoute
