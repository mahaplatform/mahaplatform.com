import EmailSerializer from '@apps/team/serializers/email_serializer'
import { personalizeEmail } from '@apps/automation/services/email'
import Email from '@apps/maha/models/email'

const showRoute = async (req, res) => {

  const email = await Email.where({
    id: req.params.id
  }).fetch({
    withRelated: ['activities.link','user.photo','email_campaign'],
    transacting: req.trx
  })

  if(!email) return res.status(404).respond({
    code: 404,
    message: 'Unable to load email'
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

  await res.status(200).respond(email, EmailSerializer)

}

export default showRoute
