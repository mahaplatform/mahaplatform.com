import EmailActivity from '../../../../apps/maha/models/email_activity'
import EmailLink from '../../../../apps/maha/models/email_link'
import Email from '../../../../apps/maha/models/email'
import moment from 'moment'

const linkRoute = async (req, res) => {

  const email = await Email.where({
    code: req.params.email_code
  }).fetch({
    transacting: req.trx
  })

  if(!email) return res.status(404).send('not found')

  const emailLink = await EmailLink.where({
    code: req.params.link_code
  }).fetch({
    transacting: req.trx
  })

  if(!emailLink) return res.status(404).send('not found')

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
    email_link_id: emailLink.get('id'),
    type: 'click'
  }

  const emailActivity = await EmailActivity.where(activityData).query(qb => {
    qb.where('created_at', '>', moment().subtract(5, 'minutes'))
  }).fetch({
    transacting: req.trx
  })

  if(!emailActivity) await EmailActivity.forge(activityData).save(null, {
    transacting: req.trx
  })

  res.redirect(emailLink.get('url'))

}

export default linkRoute
