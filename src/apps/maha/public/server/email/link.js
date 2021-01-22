import EmailActivity from '@apps/maha/models/email_activity'
import EmailLink from '@apps/maha/models/email_link'
import Email from '@apps/maha/models/email'
import moment from 'moment'

const getQuery = async (req, { email }) => {

  if(!email.get('email_campaign_id')) return

  await email.load(['email_campaign','team'], {
    transacting: req.trx
  })

  const utm = {
    medium: 'email',
    source: email.related('team').get('fqdn'),
    campaign: email.related('email_campaign').get('title'),
    contact: email.get('contact_id'),
    email: email.get('email_campaign_id')
  }

  const query = Object.keys(utm).map(key => {
    return `utm_${key}=${utm[key]}`
  }).join('&')

  return `?${query}`

}

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
    delivered_at: email.get('delivered_at') || moment(),
    clicked_at: email.get('clicked_at') || moment(),
    opened_at: email.get('opened_at') || moment(),
    was_delivered: true,
    was_clicked: true,
    was_opened: true
  }, {
    patch: true,
    transacting: req.trx
  })

  await EmailActivity.forge({
    team_id: email.get('team_id'),
    email_id: email.get('id'),
    email_link_id: emailLink.get('id'),
    type: 'click'
  }).save(null, {
    transacting: req.trx
  })

  const query = await getQuery(req, {
    email
  })

  res.redirect(emailLink.get('url') + query)

}

export default linkRoute
