import EmailActivity from '../../../../apps/maha/models/email_activity'
import Email from '../../../../apps/maha/models/email'
import moment from 'moment'
import path from 'path'

const getRoot = () => {
  if(process.env.NODE_ENV === 'production') {
    return path.resolve(__dirname,'..','..','..','..','public','admin')
  }
  return path.resolve(__dirname,'..','..','..','admin','public')
}

const root = getRoot()

const trackerFile = path.join(root,'images','tracker.png')

const openRoute = async (req, res) => {

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

  await EmailActivity.forge({
    team_id: email.get('team_id'),
    email_id: email.get('id'),
    type: 'open'
  }).save(null, {
    transacting: req.trx
  })

  res.sendFile(trackerFile)

}

export default openRoute
