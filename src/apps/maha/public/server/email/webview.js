import { personalizeEmail } from '../../../../crm/services/email'
import EmailActivity from '../../../models/email_activity'
import Email from '../../../models/email'

const webviewRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.where('code', req.params.email_code)
  }).fetch({
    withRelated: ['email_campaign'],
    transacting: req.trx
  })

  if(!email) return res.status(404).send('not found')

  await email.save({
    was_delivered: true,
    was_opened: true,
    was_webviewed: true
  }, {
    patch: true,
    transacting: req.trx
  })

  await EmailActivity.forge({
    team_id: email.get('team_id'),
    email_id: email.get('id'),
    type: 'webview'
  }).save(null, {
    transacting: req.trx
  })

  if(email.get('email_campaign_id')) {
    const campaign = email.related('email_campaign')
    const personalized = personalizeEmail(req, {
      subject: campaign.get('config').settings.subject,
      html: campaign.get('html'),
      data: email.get('data')
    })
    email.set('subject', personalized.subject)
    email.set('html', personalized.html)
  }

  res.status(200).type('text/html').send(email.get('html'))

}

export default webviewRoute