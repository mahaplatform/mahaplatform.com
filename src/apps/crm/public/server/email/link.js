import EmailActivity from '../../../models/email_activity'
import EmailLink from '../../../models/email_link'
import Email from '../../../models/email'
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

  const emailActivity = await EmailActivity.query(qb => {
    qb.where('team_id', email.get('team_id'))
    qb.where('email_id', email.get('id'))
    qb.where('email_link_id', emailLink.get('id'))
    qb.where('type', 'click')
    qb.where('created_at', '>', moment().subtract(5, 'minutes'))
  }).fetch({
    transacting: req.trx
  })

  if(!emailActivity) await EmailActivity.forge({
    team_id: email.get('team_id'),
    email_id: email.get('id'),
    email_link_id: emailLink.get('id'),
    type: 'click'
  }).save(null, {
    transacting: req.trx
  })

  res.redirect(emailLink.get('url'))

}

export default linkRoute
